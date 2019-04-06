import React from 'react';
import {formatMoney} from '../../helpers';

/*
export default props => {
    return(
        <li className="collection-item avatar">
        <img className="circle" src={`/dist/${props.images[0]}`} alt={`${props.name} product image`}/>
        <span className="title">{props.name}</span>
        <p>{formatMoney(props.price)}</p>
        </li>
    );
}
*/

//The destructured method

export default ({name, price, id, images: [productImg = ""], goToDetails}) => {
    return(
        <li className="collection-item avatar product-item" onClick={()=>{goToDetails(id)}}>
        <img className="circle" src={`/dist/${productImg}`} alt={`${name} product image`}/>
        <span className="title">{name}</span>
        <p>{formatMoney(price)}</p>
        </li>
    );
} 