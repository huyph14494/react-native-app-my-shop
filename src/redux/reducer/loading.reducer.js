import actiontypes from '../action/actiontypes';

const initialState = {status: false};

export default (state = initialState, {type, status}) => {
  switch (type) {
    case actiontypes.ON_TOGGLE_LOADING:
      return {...state, status: !status};
    default:
      return state;
  }
};
