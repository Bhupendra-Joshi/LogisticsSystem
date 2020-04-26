import {
    AUTHENTICATE_USER_START,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_FAILURE,
    LOGOUT_USER
} from '../constants';
import fetchRequest from '../../utils/network';

const authenticateUserStart = () => ({
    type: AUTHENTICATE_USER_START,
})

const authenticateUserSuccess = (data) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    data,
})

const authenticateUserFailure = (error: string) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
})

export const authenticateUser = (payload) => dispatch => {
    dispatch(authenticateUserStart());
    const userData = {
        "id": "1123",
        "email": "test@coalshasta.com",
        "mobile": "7021966405",
        "password": "12345678",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4"
    }

    setTimeout(() => {
        if ((payload.userName == userData.email || payload.userName == userData.mobile)
            && payload.password == userData.password) {
            dispatch(authenticateUserSuccess(userData));
        } else {
            dispatch(authenticateUserFailure("Incorrect email/rmn or password!!!"));
        }
    }, 2000)
}

const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const logout = () => dispatch => {
    dispatch(logoutUser());
}