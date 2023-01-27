import actionTypes from '../saga-types';

/* The initial state of the reducer. */
const initialState = {
  downloadedFiles: [],
};
/* A map of action types to functions that will be called when the action is dispatched. */

const actionMap = {
  [actionTypes.Update_files]: (state, act) => ({...state, ...act.payload}),
  [actionTypes.deleteFiles]: (state, act) => ({...state, ...act.payload}),
  [actionTypes.deleteAll]: (state, act) => initialState,
};

/**
 * If the action type is in the actionMap, call the corresponding function and return the result.
 * Otherwise, return the state
 * @param [state] - The current state of the reducer.
 * @param action - The action object that was dispatched.
 * @returns The handler function is being returned.
 */
const file_reducer = (state = initialState, action) => {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
};

export default file_reducer;
