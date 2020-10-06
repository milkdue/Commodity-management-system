// 此文件用于汇总多个reducer交给stroe
import {combineReducers} from 'redux';
import createUserInfoReducer from './create_or_delete_user_info_reducer.js';

export default combineReducers({
    userInfo: createUserInfoReducer
})
