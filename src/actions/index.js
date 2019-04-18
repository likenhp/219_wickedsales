//this is where all action creators will be defined
//action creators are functions, it creates an action
//every action must contain one property
    //specifically its type
//action is dispatched, when dispatched it goes to the reducer

export function signIn(user){
    console.log('Sign In Action Creator, user data', user);

    return {
        type: 'SIGN_IN' 
    }

}