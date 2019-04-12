import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import ProductRoutes from './products'; //same as import ProductRoutes from './products/index'
import Home from './home';
import Nav from './nav';
import NotFound from './404';
import Cart from './cart'


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            cartItems: 0
        }

        this.updateCartItems = this.updateCartItems.bind(this);
    }

    componentDidMount(){
        this.getCartItemsCount();
    }

    async getCartItemsCount(){
        const resp = await axios.get('/api/getcartitemcount.php');
        //console.log('Item COunt Resp:', resp);
        this.updateCartItems(resp.data.itemCount);
    }

    updateCartItems(count){
        this.setState({
            cartItems: count
        });
    }

    render(){
        return(
            <div>
                <Nav cartItems = {this.state.cartItems}/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/products" render={(routingProps)=>{
                            return <ProductRoutes {...routingProps} updateCart={this.updateCartItems}/>
                        }}/>
                        <Route path="/cart" component={Cart}/>
                        <Route component={NotFound}/> 
                        {/* this is a default path if all others fail */}
                    </Switch>
                </div>
            </div>
        );
    }
}
export default App;
