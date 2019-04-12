import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../404';
import SignIn from './sign_in';

export default props => {
    const {match} = props;
    console.log("Account Routes Props:", match);
    return(
        <Switch>
            <Route path={`${match.path}/sign-in`} component={SignIn}/>
            <Route component={NotFound}/>
        </Switch>
    );
}

