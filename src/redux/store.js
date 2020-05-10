import reducer from './reducer/root.reducer';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

export default store;
