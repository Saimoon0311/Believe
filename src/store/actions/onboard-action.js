import Types from '../saga-types';

export const getGoals = () => ({type: Types.OnBoardGoals_Dispatch});
export const getFeelings = () => ({type: Types.OnBoardFeelings_Dispatch});
export const getTracks = () => ({type: Types.OnBoardTracks_Dispatch});

export const getRecentlySearch = () => ({type: Types.getRecentlySearch})
export const getSuggestedKeyword = () => ({type: Types.getSuggestedKeyword})
export const searching = payload => ({type: Types.searching, payload})