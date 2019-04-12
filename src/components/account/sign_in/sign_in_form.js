import React from 'react';
import {reduxForm} from 'redux-form'; 


//reduxForm is a highre order function

const SignInForm = props =>{
    return(
        <form action="">
            <h1>Form Goes Here</h1>
        </form>
    );
}

export default reduxForm({
    form: 'sign-in-form' /* this is where you set the name of the form, does not come from anywhere, 
    probably won't be used again, it's for redux internally*/
})(SignInForm);
//reduxForm calls a function that returns a function
//currying function
