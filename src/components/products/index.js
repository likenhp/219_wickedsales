import './products.scss'; //this css is not isolated, will affect everything from now on
import React from 'react';
import {Route} from 'react-router-dom';
import ProductList from './product_list';
import ProductDetails from './product_details';

export default props => {
    return (
        <div className="products">
            <Route path="/products" exact component={ProductList}/>
            <Route path="/products/:product_id" render={(routingProps)=>{
                return <ProductDetails {...routingProps} updateCart={props.updateCart}/>
            }}/>
        </div>
    )
}