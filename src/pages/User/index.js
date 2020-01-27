import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import MyAdItem from '../../components/partials/MyAdItem';

const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const user = await api.getUser();
            setName(user.name);
            setEmail(user.email);
            setStateLoc(user.state);
            setAdList(user.ads);
            setLoading(false);
        }
        getUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if (password !== confirmPassword) {
            setError('A senha não coincide!');
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <PageTitle>Minhas informações</PageTitle>
                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }

                    <form onSubmit={handleSubmit}>

                        <label className="area">
                            <div className="area--title">Nome Completo</div>
                            <div className="area--input">
                                <input
                                    type="text"
                                    disabled={disabled}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Estado</div>
                            <div className="area--input">
                                <select value={stateLoc} onChange={e => setStateLoc(e.target.value)} required>
                                    <option></option>
                                    {stateList.map((i, index) =>
                                        <option key={index} value={i.name}>{i.name}</option>
                                    )}
                                </select>
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Email</div>
                            <div className="area--input">
                                <input
                                    type="email"
                                    disabled={disabled}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Senha</div>
                            <div className="area--input">
                                <input
                                    type="password"
                                    disabled={disabled}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Confirmar Senha</div>
                            <div className="area--input">
                                <input
                                    type="password"
                                    disabled={disabled}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled} >Salvar Alterações</button>
                            </div>
                        </label>

                    </form>
                </div>
                <div className="rightSide">
                    <PageTitle>Meus anúncios</PageTitle>

                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Não encontramos resultados.</div>
                    }

                    {adList &&
                        <>
                            <div className="list">
                                {adList.map((i, index) =>
                                    <MyAdItem key={index} data={i} />
                                )}
                            </div>
                        </>
                    }
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;