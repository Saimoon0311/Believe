import actionTypes from '../saga-types';

/* Setting the initial state of the reducer. */
const initialState = {
  homeContent: {},
  liveEvents: {},
  allReminders: [],
  allCategories: [],
  allLibraries: [],
  allLibAudios: [],
  allCatVideos: [],
  allCourses: [],
  allSeries: [],
  allEBooks: [],
  allReviews: [],
  scriptChapters: [],
  allScripts: [],
  backgrounds: [],
  ringtones: [],
  allFavorites: [],
  favoriteContentData: {},
  allCourseLessons: [],
  contentLibraries: [],
  playlistData: [],
  playlist: {},
  playlistAudios: [],
  allNewLibraries: [],
  requestParam: '',
};

/* A map of actions to functions that will be called when the action is dispatched. */
const actionMap = {
  [actionTypes.Content_Update]: (state, act) => ({...state, ...act.payload}),
  [actionTypes.LogOut]: (state, act) => initialState,
};

/**
 * If the action type is in the actionMap, call the corresponding function and return the result.
 * Otherwise, return the state
 * @param [state] - the current state of the reducer
 * @param action - The action object that was dispatched.
 * @returns The booking_reducer is being returned.
 */
const content_reducer = (state = initialState, action) => {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
};

export default content_reducer;
