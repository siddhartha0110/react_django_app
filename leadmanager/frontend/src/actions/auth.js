import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { returnErrors } from './messages';

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })


    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//LOGIN USER
export const login = (username, password) => dispatch => {
    dispatch({
        type: USER_LOADING
    })
    //header set
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password });

    axios.post('api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
//Logout User
export const logout = () => (dispatch, getState) => {
    axios.post('api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

        })
}

export const tokenConfig = getState => {
    //Token from state
    const token = getState().auth.token

    //header set
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //if token is present
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

//REGISTER USER
export const register = ({ username, password, email }) => dispatch => {

    //header set
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password, email });

    axios.post('api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}