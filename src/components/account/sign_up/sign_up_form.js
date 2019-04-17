import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    console.log('sign up props:', props);
    const {handleSubmit, signUp} = props;
    return(
        <form onSubmit={handleSubmit(signUp)}>
            <div className="row">
                <Field id="email" name="email" component={Input}  label="Email" col='s6'/>
                <Field id="username" name="username" component={Input}  label="Username" col='s6'/>
            </div>
            <div className="row">
                <Field id="password" name="password" component={Input}  label="Password" col='s6' type='password'/>
                <Field id="confirmpass" name="confirmpass" component={Input}  label="Confirm Password" col='s6' type='password'/>
            </div>
            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn orange darken-3">Sign Up</button>
                </div>
            </div>
        </form>
    );
}

function validate(values){
    const {email, username, password, confirmpass} = values;
    const errors = {};

    if(!email){
        errors.email = "Please enter your email"
    }

    if(!username){
        errors.username = "Please enter your username"
    }

    if(!password){
        errors.password = "Please enter a password"
    }

    if(!confirmpass){
        errors.confirmpass = "Please conrim your password"
    }

    if(password !==confirmpass){
        errors.confirmpass = "Passwords don't match!"
        errors.password = "Passwords don't match!"
    }

    return errors;
}

export default reduxForm({
    form: 'sign-up-form',
    validate: validate
})(SignUpForm);