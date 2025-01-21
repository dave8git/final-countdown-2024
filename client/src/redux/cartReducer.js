import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */

/* ACTIONS */
// action name creator
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* THUNKS */

/* INITIAL STATE */
const initialState = {
    data: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {

        default:
            return statePart;
    }
}