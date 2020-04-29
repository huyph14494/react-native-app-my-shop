import {combineReducers} from 'redux';
import loadingReducer from './loading.reducer';

const reducer = combineReducers({
  loading: loadingReducer,
});

export default reducer;
