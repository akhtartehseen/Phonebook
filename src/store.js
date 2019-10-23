import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import getRootReducer from './models';

export default function getStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        undefined,
        applyMiddleware(thunk)
    );

    return store;
}