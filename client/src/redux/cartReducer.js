import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */

/* ACTIONS */
// action name creator
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');

export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const updateCartQuantity = (payload) => ({ payload, type: UPDATE_CART_QUANTITY})
/* THUNKS */

/* INITIAL STATE */
const initialState = {
    data: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case ADD_TO_CART: {
            const existingItem = statePart.data.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...statePart, 
                    data: statePart.data.map(item => 
                        item.id === action.payload.id  
                            ? { ...item, quantity: item.quantity + action.payload.quantity } 
                            : item
                    ), 
                };
            } else {
                console.log(`Action name: ${action.type} and payload: ${action.payload}`);
                console.log(`statePart: ${statePart}`, statePart);
                console.log(`data: ${statePart}`);
                return { 
                    ...statePart, 
                    data: [...statePart.data, action.payload ] 
                };
            }
        }
         
        
        default:
            return statePart;
    }
}