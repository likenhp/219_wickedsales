//bring all of the reeducers together here
//the root reducer
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    form: formReducer, //defines the shape of the state
    user: userReducer
    //whatver the "user" is called will define the shape of the state 
    //everything will be a property or method of user from now on
    //all states will have it's name be "user"
});
//this what the root will look like
//this is a map of the state, sets what state will look like

/*
const state = {
    form: {},
    user: {
        auth: false,
        username: ''
    }
}
*/

export default rootReducer;
