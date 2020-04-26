import { combineReducers } from 'redux'
import userReducer from './userReducer';
import trucksReducer from './trucksReducer';

export default combineReducers({
    userData: userReducer,
    trucksData: trucksReducer,
});