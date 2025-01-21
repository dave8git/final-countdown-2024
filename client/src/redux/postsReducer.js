import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
//export const getPostsById = ({ posts }, id) => posts.data.find(post => post._id === id);
export const getPostsById = ({ posts }, id) => posts.data.find(post => post.id === id);
/* ACTIONS */
// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const ADD_POST = createActionName('ADD_POST');
const SEARCH_POSTS = createActionName('SEARCH_POSTS');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });
export const addPost = payload => ({ payload, type: ADD_POST });
export const searchPosts = payload => ({ payload, type: SEARCH_POSTS });

/* THUNKS */

export const loadProductsRequest = () => {
    return async dispatch => {

        dispatch(startRequest({ name: 'LOAD_PRODUCTS' }));
        try {
            let res = await axios.get(`${API_URL}/products`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(loadProducts(res.data));
            dispatch(endRequest({ name: 'LOAD_PRODUCTS' }));
        } catch (e) {
            dispatch(errorRequest({ name: 'LOAD_PRODUCTS', error: e.message }));
        }
    };
};

export const loadPostByIdRequest = (id) => {
    console.log('loadPostByIdRequest');
    return async (dispatch) => {
        dispatch(startRequest({ name: 'LOAD_PRODUCTS' }));
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            console.log('response', response);
            dispatch(loadProducts([response.data]));
            dispatch(endRequest({ name: 'LOAD_PRODUCTS' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'LOAD_PRODUCTS', error: error.message }));
        }
    };
};

export const loadLocalPosts = () => {
    return async dispatch => {
        let res = await axios.get(`${API_URL}/posts`);
        dispatch(loadProducts(res.data));
    }
}
// dokończyć dalej wzorując się na pliku: // sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js

export const addPostRequest = (post) => {
    console.log('addPostRequest works');
    return async (dispatch, getState) => {
        dispatch(startRequest({ name: 'ADD_POST' }));
        try {
            const state = getState();
            // console.log('!!!', state.posts.user);
            // console.log('post', post);
            const postObject = {};
            for (const [key, value] of post.entries()) {
                postObject[key] = value;
            }
            console.log('Converted post (Object)', postObject);
            const objectToBackend = {
                ...postObject,
                author: state.posts.user.id,
            }
            let res = await axios.post(`${API_URL}/posts`, objectToBackend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(addPost(res));
            dispatch(endRequest({ name: 'ADD_POST' }));
            dispatch(loadProductsRequest());
        } catch (error) {
            console.log('error', error);
            dispatch(errorRequest({ name: 'ADD_POST', error: error.response?.data?.message || 'An error occured' }));
        }
    };
};

export const searchPostsRequest = (searchPhrase) => {
    return async (dispatch) => {
        dispatch(startRequest({ name: 'SEARCH_POSTS' }));
        try {
            const res = await axios.get(`${API_URL}/posts/search?q=${encodeURIComponent(searchPhrase)}`);
            dispatch(loadProducts(res.data));
            dispatch(endRequest({ name: 'SEARCH_POSTS' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'SEARCH_POSTS', error: error.message }));
        }
    };
};

/* INITIAL STATE */
const initialState = {
    data: [],
    requests: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            console.log('!', action.payload);
            return { ...statePart, data: [...action.payload] };
        case START_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false } } };
        case END_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: true } } };
        case ERROR_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false } } };
        case SEARCH_POSTS:
            return { ...statePart, data: [...action.payload] };
        default:
            return statePart;
    }
}