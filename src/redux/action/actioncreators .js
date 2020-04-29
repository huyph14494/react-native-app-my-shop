import actiontypes from './actiontypes';

function onToggleLoading(status) {
  return {type: actiontypes.ON_TOGGLE_LOADING, status};
}

export default {
  onToggleLoading,
};
