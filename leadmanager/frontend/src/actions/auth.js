import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, USER_LOADING } from './types';
import { returnErrors } from './messages';

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })

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

    axios.get('api/auth/user', config)
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