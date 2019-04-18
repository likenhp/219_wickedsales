import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Sidenav from './sidenav';
import CartLink from './cart_link';
import './nav.scss';

class Nav extends Component {
    state = {
        authLinks: [{
            to: '/account/orders',
            text: 'My Orders'
        },
        {
            to: '/account/profile',
            text: 'My Profile'
        },
        {
            to: '/account/sign-out',
            text: 'Sign Out'
        }],
        guestLinks: [{
            to: '/account/sign-in',
            text: 'Sign In'
        },
        {
            to: '/account/sign-up',
            text: 'Sign Up'
        }]
        //2 arrays of links, one for logged in and one not
    }

    buildLink(link){
        return(
            <li key={link.to}>
                <Link to={link.to}>{link.text}</Link>
            </li>
        )
    }

    renderLinks(){
        const {userAuth} = this.props;
        const {authLinks, guestLinks} = this.state;
        let navLinks = null;

        if(userAuth){
            navLinks = authLinks.map(this.buildLink);
        } else{
            navLinks = guestLinks.map(this.buildLink);;;
        }

        return (
        <Fragment>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            {navLinks}
            <li>
                <CartLink items={this.props.cartItems}/>
            </li>
        </Fragment>
        )
    }

    render(){
        const links = this.renderLinks();

        console.log("MTSP", this.props);

        return(
            <Fragment>
                <nav className="purple darken-4">
                <div className="nav-wrapper">
                    <Link className="brand-logo" to="/">Wicked Sales</Link>
                    <a href="#" data-target="sidenav" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                        
                    <ul className="right hide-on-med-and-down">
                    {links}
                    </ul>
                </div>
            </nav>

            <Sidenav links={links}/>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    //console.log("MSTP", state), shows the redux state

    return {
        userAuth: state.user.auth
    }
    //takes the object you return into the components of props
    //starts to matter when you messing with state, can take anything from state and add it to the components of props
}

export default connect(mapStateToProps)(Nav);
//connect will return Nav
//connect takes 2 main things
    //map state to props
    //map dispatch to props
