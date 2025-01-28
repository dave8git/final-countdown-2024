import axios from 'axios';

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;
export const FETCH_CART_PRODUCTS = createActionName('FETCH_CART_PRODUCTS');
export const FETCH_CART_PRODUCTS_SUCCESS = createActionName('FETCH_CART_PRODUCTS_SUCCESS');
export const FETCH_CART_PRODUCTS_FAILURE = createActionName('FETCH_CART_PRODUCTS_FAILURE');
export const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');
export const DELETE_CART_ITEM = createActionName('DELETE_CART_ITEM');
// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */
export const getCartItems = (state) => state.cart.data;

/* ACTIONS */
// action name creator

const ADD_TO_CART = createActionName('ADD_TO_CART');
//const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');

export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const updateCartQuantity = (payload) => ({ payload, type: UPDATE_CART_QUANTITY})
export const deleteCartItem = (payload) => ({payload, type: DELETE_CART_ITEM});
/* THUNKS */

export const fetchCartProducts = () => async (dispatch, getState) => {
    const cartItems = getCartItems(getState());

    if(cartItems.length === 0) return;

    dispatch({ type: FETCH_CART_PRODUCTS });

    try {
        const response = await axios.post(`${API_URL}/products/by-ids`, {
            ids: cartItems.map(item => item.id)
        });

        dispatch({
            type: FETCH_CART_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CART_PRODUCTS,
            payload: error.message
        })
    }
}

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
        case UPDATE_CART_QUANTITY: {
            return {
                ...statePart, 
                data: statePart.data.map((item) => 
                    item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
                )
            }
        }
        case FETCH_CART_PRODUCTS_SUCCESS: {
            return {
                ...statePart, 
                products: action.payload
            };
        }

        case DELETE_CART_ITEM: {
            console.log('delete działa');
            console.log('action.payload', action.paylod);
            return {
                statePart, 
                data: statePart.data.filter((item) => 
                item.id !== action.payload.id)
            }
        }
        
        default:
            return statePart;
    }
}