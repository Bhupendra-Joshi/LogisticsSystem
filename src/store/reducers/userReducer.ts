import {
    AUTHENTICATE_USER_START,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_FAILURE,
    LOGOUT_USER,
} from '../constants';

const initialState = {
    data: '',
    error: '',
    isLoading: false,
}

const userReducer = (state = initialState, action: any) => {
    const {
        type,
        data,
        error,
    } = action;

    switch (type) {
        case AUTHENTICATE_USER_START: {
            return {
                ...state,
                error: '',
                isLoading: true
            }
        }
        case AUTHENTICATE_USER_SUCCESS: {
            return {
                ...state,
                data: data,
                isLoading: false
            }
        }
        case AUTHENTICATE_USER_FAILURE: {
            return {
                ...state,
                error,
                isLoading: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer