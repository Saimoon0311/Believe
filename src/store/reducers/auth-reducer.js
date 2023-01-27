import actionTypes from '../saga-types';

/* The initial state of the reducer. */
const initialState = {
  user: {},
  token: '',
  update: false,
  forgot: false,
  isLogin: false,
  loading: false,
  verifyToken: '',
  isRegister: false,
  verification: false,
  isInternetAvailable: true,
};
/* A map of action types to functions that will be called when the action is dispatched. */
const actionMap = {
  [actionTypes.Auth_Update]: (state, act) => ({...state, ...act.payload}),
  [actionTypes.LogOut]: () => initialState,
};

/**
 * If the action type is in the actionMap, call the corresponding function and return the result.
 * Otherwise, return the state
 * @param [state] - The current state of the reducer.
 * @param action - The action object that was dispatched.
 * @returns The handler function is being returned.
 */
const auth_reducer = (state = initialState, action) => {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
};

export default auth_reducer;
