//this is where all action creators will be defined
//action creators are functions, it creates an action
//every action must contain one property
    //specifically its type
//action is dispatched, when dispatched it goes to the reducer
import types from './types';

export function signIn(user){
    console.log('Sign In Action Creator, user data', user);

    return {
        type: types.SIGN_IN,
        email: user.email
    }

}

//make an action creator
//make the action type SIGN_OUT

export function signOut(user){
    console.log('Sign Out Action Creater, user data', user);

    return{
        type: types.SIGN_OUT
        //every action has a single type, but the types object has many differeny type so we call it types
    }
}