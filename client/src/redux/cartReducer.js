import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */

/* ACTIONS */
// action name creator
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');

export const addToCart = payload => ({ payload, type: ADD_TO_CART });
/* THUNKS */

/* INITIAL STATE */
const initialState = {
    data: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            console.log(`Action name: ${action.type} and payload: ${action.payload}`);
        default:
            return statePart;
    }
}