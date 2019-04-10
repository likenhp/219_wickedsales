import React, {Component} from 'react';

class ProductAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            qty: 1
        }

        this.incrementQty = this.incrementQty.bind(this);
        this.decrementQty = this.decrementQty.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    decrementQty(){
    if(this.state.qty > 1){
        this.setState({
            qty: this.state.qty - 1
        });
    }    
    }

    incrementQty(){
        this.setState({
            qty: this.state.qty + 1
        });
    }

    addToCart(){
        console.log('Add', this.state.qty, 'products to cart',this.props.productId);
    }

    render(){
        return(
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
            </div>
        );
    }
}

export default ProductAdd;
