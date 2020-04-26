import {
    FETCH_TRUCKS_START,
    FETCH_TRUCKS_SUCCESS,
    FETCH_TRUCKS_FAILURE,
} from '../constants';

const initialState = {
    data: [],
    error: '',
    isLoading: false,
}

const trucksReducer = (state = initialState, action: any) => {
    const {
        type,
        data,
        error,
    } = action;

    switch (type) {
        case FETCH_TRUCKS_START: {
            return {
                ...state,
                error: '',
                isLoading: true
            }
        }
        case FETCH_TRUCKS_SUCCESS: {
            return {
                ...state,
                data: data,
                isLoading: false
            }
        }
        case FETCH_TRUCKS_FAILURE: {
            return {
                ...state,
                error,
                isLoading: false
            }
        }
        default: {
            return state
        }
    }
}

export default trucksReducer