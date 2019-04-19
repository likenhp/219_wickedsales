import React from 'react';
import {reduxForm, Field} from 'redux-form'; 
import Input from '../../general/input';


//reduxForm is a higher order function

const SignInForm = props =>{
    console.log("signin in form props", props);
    const {handleSubmit, signIn} = props;
    console.log("handke", handleSubmit);
    return(
        <form onSubmit={handleSubmit(signIn)}>
            <div className="row">
                <Field id="email" name="email" component={Input}  label="Email" col='s12'/>
            </div>

            <div className="row">
                <Field id="password" name="password" component={Input} type="password" label="Password" col='s12'/>
            </div>

            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn orange darken-3">Sign In</button>
                </div>
            </div>
        </form>
    );
}

function validate({email, password}){ //when validate is called it will get all form values
    //const {email, password} = values;
    const errors = {};

    if (!email){
        errors.email = 'Please enter your email'; //property added on must have exact same name
    }

    if(!password){
        errors.password = 'Please enter your password';
    }

    return errors;

}

export default reduxForm({
    form: 'sign-in-form', 
    /* this is where you set the name of the form, does not come from anywhere, 
    probably won't be used again, it's for redux internally*/
    validate: validate
})(SignInForm);
//reduxForm calls a function that returns a function
//currying function
