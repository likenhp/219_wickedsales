import React, {Component} from 'react';
import SignUpForm from './sign_up_form';

class SignUp extends Component{
    handleSignUp(values){
        console.log("Form Values:", values);
    }

    render(){
        return(
            <div>
                <h1 className="center">Sign Up</h1>
                <SignUpForm signUp={this.handleSignUp}/> 
            </div>
        )
    }
}

export default SignUp;