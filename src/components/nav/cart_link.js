import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    return(
        <Link className="cart-link" to="/cart">
            <i className="material-icons cart-icon">shopping_cart</i>
            <span className="sidenav-cart">View Cart</span>
            <span className="cart-items">{props.items}</span>
        </Link>
    )
}
