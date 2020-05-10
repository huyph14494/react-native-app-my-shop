const ON_LOGIN_TRIAL = 'ON_LOGIN_TRIAL';

function onLoginTrial(payload) {
  return {type: ON_LOGIN_TRIAL, payload};
}

export {onLoginTrial, ON_LOGIN_TRIAL};
