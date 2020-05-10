import * as userAction from '../action/user.action';

const initialState = {
  login_status: false,
  expired_time: null,
  username: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case userAction.ON_LOGIN_TRIAL:
      return {...state, login_status: true};
    default:
      return state;
  }
};
