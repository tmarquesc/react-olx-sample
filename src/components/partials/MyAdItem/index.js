import React from 'react';
import { Item } from './styled';


export default (props) => {
  let price = "";
  let img = "";

  img = props.data.images.filter(image => image.default === true);

  let imgUrl = img.map(i => i.url);
  console.log("image:", imgUrl);

  if (props.data.priceNegotiable) {
    price = "Preço negociável";
  } else {
    price = Number(props.data.price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }


  return (
    <Item className="aditem">
      <button>
        <div className="itemImage">
          {imgUrl &&
            <img src={`http://alunos.b7web.com.br:501/media/${imgUrl}`} alt="" />
          }
        </div>
        <div className="itemName">{props.data.title}</div>
        <div className="itemPrice">{price}</div>
      </button>
    </Item>
  )
}
