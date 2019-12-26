import React from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';

export default (props) => {
  let price = "";

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
      <Link to={`/ad/${props.data.id}`}>
        <div className="itemImage">
          <img src={props.data.image} alt="" />
        </div>
        <div className="itemName">{props.data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  )
}
