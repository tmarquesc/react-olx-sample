import React, { useState, useRef, useEffect } from 'react';
import { Item, Overlay, Dialog, Fechar, PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../MainComponents';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import useApi from '../../../helpers/OlxApi';

export default (props) => {
    let price = "";
    let img = "";
    let id = "";

    const api = useApi();
    const fileField = useRef();
    const [modal, setModal] = useState(false);

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priceItem, setPriceItem] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState(true);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    id = props.data.id;
    img = props.data.images.filter(image => image.default === true);

    let imgUrl = img.map(i => i.url);

    if (props.data.priceNegotiable) {
        price = "Preço negociável";
    } else {
        price = Number(props.data.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        setTitle(props.data.title);
        setCategory(props.data.category);
        setPriceItem(props.data.price);
        setPriceNegotiable(props.data.priceNegotiable);
        setDesc(props.data.description);
    }, []);


    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        let errors = [];

        if (!title.trim()) {
            errors.push('sem título');
        }

        if (!category) {
            errors.push('Sem categoria');
        }

        if (errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', priceItem);
            fData.append('priceNegotiable', priceNegotiable);
            fData.append('description', desc);
            fData.append('category', category);
            fData.append('status', status);

            if (fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.AltAd(id, fData);

            if (!json.error) {
                setModal(false);
                return;
            } else {
                setError(error);
            }

        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);

    }

    return (
        <Item className="aditem">
            <button onClick={() => setModal(true)}>
                <div className="itemImage">
                    {imgUrl &&
                        <img src={`http://alunos.b7web.com.br:501/media/${imgUrl}`} alt="" />
                    }
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </button>

            {modal &&
                <Overlay>
                    <Dialog>
                        <Fechar onClick={() => setModal(false)}>X</Fechar>
                        <PageContainer>
                            <PageTitle>Alterar anúncio</PageTitle>
                            <PageArea>
                                {error &&
                                    <ErrorMessage>{error}</ErrorMessage>
                                }

                                <form onSubmit={handleSubmit}>

                                    <label className="area">
                                        <div className="area--title">Titulo</div>
                                        <div className="area--input">
                                            <input
                                                type="text"
                                                disabled={disabled}
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Categoria</div>
                                        <div className="area--input">
                                            <select
                                                disabled={disabled}
                                                value={category}
                                                onChange={e => setCategory(e.target.value)}
                                                required
                                            >
                                                <option></option>
                                                {categories && categories.map(i =>
                                                    <option key={i._id} value={i.slug}>{i.name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Preço</div>
                                        <div className="area--input">
                                            <MaskedInput
                                                mask={priceMask}
                                                placeholder="R$"
                                                disabled={disabled || priceNegotiable}
                                                value={priceItem}
                                                onChange={e => setPriceItem(e.target.value)}
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Preço negociável</div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                disabled={disabled}
                                                checked={priceNegotiable}
                                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Descrição</div>
                                        <div className="area--input">
                                            <textarea
                                                disabled={disabled}
                                                value={desc}
                                                onChange={e => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Images(1 ou mais)</div>
                                        <div className="area--input">
                                            <input
                                                type="file"
                                                disabled={disabled}
                                                ref={fileField}
                                                multiple
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Anúncio Ativo</div>
                                        <div className="area--input">
                                            <select
                                                disabled={disabled}
                                                value={status}
                                                onChange={e => setStatus(e.target.value)}
                                                required
                                            >
                                                <option value={true}>Sim</option>
                                                <option value={false}>Não</option>
                                            </select>
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title"></div>
                                        <div className="area--input">
                                            <button disabled={disabled} >Salvar Alterações</button>
                                        </div>
                                    </label>

                                </form>
                            </PageArea>
                        </PageContainer>
                    </Dialog>
                </Overlay >
            }
        </Item>
    )
}
