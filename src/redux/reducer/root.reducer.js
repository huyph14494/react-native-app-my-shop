import {combineReducers} from 'redux';
import userReducer from './user.reducer';

const reducer = combineReducers({
  userInfo: userReducer,
});

export default reducer;
