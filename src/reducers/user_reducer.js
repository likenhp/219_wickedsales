
const DEFAULT_STATE = {
    auth: false, /* */
    username: ''
};

//the reducer is just a function
//each reducer is responsible for its own state
//each is passed a state and action
//an action is just an object, but it is what it responsible fo reverything
    //it must have a type property, tells how to update the state

/*const exampleAction = {
    type: 'LOG_USER_IN',
    username: 'David Lee'
}*/

function userReducer(state = DEFAULT_STATE, action){
    switch(action.type){
        case 'LOG_USER_IN':
            return{...state, auth: true, username: action.username}; 
        //returning just auth will delete username since the return replaces the default state, 
        //generally want to deconstruct initial state
        default:
            return state;
    }
}

//must take into account when the state is first made
//we give state a default if state is not given out

export default userReducer;
