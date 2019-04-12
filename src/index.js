import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'; //provieds all redux for react
import {createStore} from 'redux'; //it is the storage container for redux, it is the state
import rootReducer from './reducers';


import App from './components/app';

const store = createStore(rootReducer);
//where data is stored

ReactDOM.render(
    <Provider store={store}> 
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

/* Provider takes in a prop of the store, and we created a store up in the const */