import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Modal from '../modal';
import {formatMoney} from '../../helpers';

class ProductAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qty: 1,
            modalOpen: false,
            totalPrice: 0,
            cartQty: 0
        }

        this.incrementQty = this.incrementQty.bind(this);
        this.decrementQty = this.decrementQty.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToCart = this.goToCart.bind(this);
    }

    decrementQty() {
        if (this.state.qty > 1) {
            this.setState({
                qty: this.state.qty - 1
            });
        }
    }

    incrementQty() {
        this.setState({
            qty: this.state.qty + 1
        });
    }

    addToCart() {
        // console.log('Add', this.state.qty, 'products to cart', this.props.productId);

        const { productId, updateCart } = this.props;
        const { qty } = this.state;
        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then(resp => {
            //console.log('Add Cart Resp:', resp)
            //console.log('Add to cart resp: ', resp);
            //this.props.history.push('/cart'); //tell thing where to go to

            const {cartCount, cartTotal} = resp.data;

            updateCart(cartCount);
            this.setState({
                modalOpen: true,
                totalPrice: cartTotal,
                cartQty: cartCount
            });
        });
    }

    closeModal(){
        this.setState({
            modalOpen: false,
            qty: 1
        });
    }

    goToCart(){
        this.props.history.push('/cart');
    }

    render(){
        //console.log('Products Add Props:', this.props);
        const {modalOpen, totalPrice, cartQty,  qty} = this.state;

        return (
            <div className="right-align add-to-cart">
                <span className="qty-container">
                    <button onClick={this.decrementQty} className="btn btn-small btn-floating purple darken-1">
                        <i className="material-icons">remove</i>
                    </button>
                    <span className="product-qty">{this.state.qty}</span>
                    <button onClick={this.incrementQty} className="btn btn-small btn-floating purple darken-1">
                        <i className="material-icons">add</i>
                    </button>
                </span>
    
                <button onClick={this.addToCart} className="btn purple darken-1">
                    <i className="material-icons">add_shopping_cart</i>
                </button>
                <Modal defaultAction={this.closeModal} defaultActionText="Continue Shopping" isOpen={modalOpen} secondaryAction={this.goToCart} secondaryActionText="View Cart">

                    <h1 className="center">{qty} Item{qty > 1 && "s"} Added to Cart</h1>
                    <div className="row">
                        <div className="col s6">Cart Total Items:</div>
                        <div className="col s6 left-align">{cartQty}</div>
                    </div>
                    <div className="row">
                        <div className="col s6">Cart Total Price:</div>
                        <div className="col s6 left-align">{formatMoney(totalPrice)}</div>
                    </div>
                </Modal>
                {/* content inside of the Modal are considered "Children" of the Component */}
            </div>
        );
    }
}

export default withRouter(ProductAdd);
