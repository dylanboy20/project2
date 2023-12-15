import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

const Authstate = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
       if(localStorage.token){
        setAuthToken(localStorage.token)
       }

        try{
            const res= await axios.get('http://localhost:5000/api/auth')
            dispatch({
                type: USER_LOADED,
                payload:res.data
            })

        }catch(err){
            dispatch({type:AUTH_ERROR})

        }


    }

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('http://localhost:5000/api/users', formData, config);
            console.log(res.data)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            loadUser()
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg, 
            });
        }
    };

    // Login user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            loadUser()
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg, 
            });
        }
    };

    // Log Out User
    const logout = () => dispatch({type:LOGOUT});

    // Clear Errors
    const clearErrors = () => dispatch({type:CLEAR_ERRORS});

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default Authstate;
