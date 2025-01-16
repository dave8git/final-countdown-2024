import axios from 'axios';

// sources: https://github.com/dave8git/testimonials-node-2024/blob/master/client/src/redux/seatsRedux.js
const API_URL = 'http://localhost:8000/api';
/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
export const getPostsById = ({ posts }, id) => posts.data.find(post => post._id === id);
export const getLoggedUser = ({ posts }) => posts.user;
/* ACTIONS */
// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const DELETE_POST = createActionName('DELETE_POST');
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');
const SEARCH_POSTS = createActionName('SEARCH_POSTS');
const REGISTER_USER = createActionName('REGISTER_USER');
const LOGIN_USER = createActionName('LOGIN_USER');
const GET_USER = createActionName('GET_USER');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const deletePost = payload => ({ payload, type: DELETE_POST });
export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });
export const updatePost = payload => ({ payload, type: UPDATE_POST });
export const addPost = payload => ({ payload, type: ADD_POST });
export const searchPosts = payload => ({ payload, type: SEARCH_POSTS });
export const registerUser = (payload) => ({ payload, type: REGISTER_USER });
export const loginUser = (payload) => ({ payload, type: LOGIN_USER });
export const getUser = (payload) => ({payload, type: GET_USER });

/* THUNKS */
export const getUserRequest = () => {
    return async (dispatch) => {
        dispatch(startRequest({ name: 'GET_USER' }));
        try {
            const response = await axios.get(`${API_URL}/auth/user`);
            dispatch(getUser(response.data ));
            dispatch(endRequest({ name: 'GET_USER' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'GET_USER', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

export const loginUserRequest = (formData) => {
    return async (dispatch) => {
        dispatch(startRequest({ name: 'LOGIN_USER' }));
        try {
            const response = await axios.post(`${API_URL}/auth/login`, formData);
            console.log('response.data', response.data, formData);
            dispatch(loginUser({message: response.data.message, user: formData.login }));
            dispatch(endRequest({ name: 'LOGIN_USER' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'LOGIN_USER', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

export const registerUserRequest = (formData) => {
    return async (dispatch) => {
        dispatch(startRequest({ name: 'REGISTER_USER' }));
        try {
            const response = await axios.post(`${API_URL}/auth/register`, formData);
            dispatch(registerUser(response.data)); // Dispatch registration success
            dispatch(endRequest({ name: 'REGISTER_USER' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'REGISTER_USER', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

export const logoutRequest = () => {
    return async (dispatch) => {
        dispatch(startRequest({ name: 'LOGOUT' }));
        try {
            await axios.post(`${API_URL}/auth/logout`);
            dispatch(endRequest({ name: 'LOGOUT' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'LOGOUT', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

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
    return async (dispatch) => {
        dispatch(startRequest({ name: 'LOAD_POST' }));
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            dispatch(loadProducts([response.data])); // Ensuring it updates correctly
            dispatch(endRequest({ name: 'LOAD_POST' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'LOAD_POST', error: error.message }));
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
    return async (dispatch, getState)=> {
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


export const deletePostRequest = (id) => {
    console.log('deleting post with id: ', id);
    return async (dispatch) => {
        dispatch(startRequest({ name: 'DELETE_POST' }));
        try {
            await axios.delete(`${API_URL}/posts/${id}`);
            dispatch(deletePost(id));
            console.log('deletePost action dispatched'); // Check if this logs
            dispatch(endRequest({ name: 'DELETE_POST' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'DELETE_POST', error: error.response?.data?.message || 'An error occurred' }));
        }
    };
};

export const updatePostRequest = (id, updatedData) => {
    console.log('Updated Data Before Conversion:', updatedData);

    // Check if updatedData is FormData and convert to an object
    let dataToSend = updatedData;  // Default to using the updatedData directly

    if (updatedData instanceof FormData) {
        const formDataObject = {};
        updatedData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log('Converted FormData to Object:', formDataObject);
        dataToSend = formDataObject;  // Use the converted object
    }

    return async (dispatch) => {
        dispatch(startRequest({ name: 'UPDATE_POST' }));

        try {
            const response = await axios.put(`${API_URL}/products/${id}`, dataToSend);
            dispatch(updatePost(response.data)); // Dispatch the updated post data to the reducer
            dispatch(endRequest({ name: 'UPDATE_POST' }));
        } catch (error) {
            dispatch(errorRequest({ name: 'UPDATE_POST', error: error.response?.data?.message || 'An error occurred' }));
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
    user: undefined,
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            console.log('!', action.payload);
            return { ...statePart, data: [...action.payload] };
        case ADD_POST:
            console.log('Adding post to state:', action.payload);
            return { ...statePart, data: [...statePart.data, action.payload] };
        case START_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false } } };
        case END_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: true, error: null, success: true } } };
        case ERROR_REQUEST:
            return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false } } };
        case DELETE_POST:
            console.log('delete request works');
            return { ...statePart, data: statePart.data.filter(post => post._id !== action.payload) };
        case UPDATE_POST:
            console.log('Updated post:', action.payload.title);
            return {
                ...statePart,
                data: statePart.data.map(post => post._id === action.payload._id ? action.payload : post)
            };
        case SEARCH_POSTS:
            return { ...statePart, data: [...action.payload] };
        case REGISTER_USER:
            return { ...statePart, message: action.payload.message };
        case LOGIN_USER:
            return { ...statePart, message: action.payload.message,  user: action.payload.user };
        case GET_USER:
            return { ...statePart, user: action.payload };
        default:
            return statePart;
    }
}