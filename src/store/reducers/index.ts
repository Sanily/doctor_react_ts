import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import doctorReducer from './doctor-reducer';

const allReducer = {
    user: userReducer, // 用户信息
    doctor: doctorReducer // 医生模块的所有信息
}

const rootReducer = combineReducers(allReducer);

export default rootReducer;