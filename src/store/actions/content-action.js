import Types from '../saga-types';

export const getHomeScreenContent = () => ({type: Types.HomeContent_Dispatch});
export const getAllEvents = () => ({type: Types.AllEvents_Dispatch});
export const getAllReminders = () => ({type: Types.AllReminders_Dispatch});
export const getAllCategoryAndLibraries = () => ({
  type: Types.AllCategoryAndLibraries_Dispatch,
});
export const getAllLibraryAudios = payload => ({
  type: Types.AllLibraryAudios_Dispatch,
  payload,
});
export const getContentLibraries = payload => ({
  type: Types.ContentLibraries_Dispatch,
  payload,
});

export const getAllScripts = () => ({
  type: Types.AllScripts_Dispatch,
});

export const getAllScriptChapters = payload => ({
  type: Types.AllScriptChapter_Dispatch,
  payload,
});

export const getAllSeries = () => ({
  type: Types.AllSeries_Dispatch,
});

export const getAllEBooks = () => ({
  type: Types.AllEBooks_Dispatch,
});

export const getAllBackgrounds = () => ({
  type: Types.AllBackground_Dispatch,
});

export const getAllRingtones = () => ({
  type: Types.AllRingtones_Dispatch,
});

export const getAllVideos = payload => ({
  type: Types.AllCategoryVideos_Dispatch,
  payload,
});

export const getAllReviews = payload => ({
  type: Types.AllReviews_Dispatch,
  payload,
});

export const postReview = payload => ({
  type: Types.PostReview_Dispatch,
  payload,
});

export const getAllCourses = payload => ({
  type: Types.AllCourses_Dispatch,
  payload,
});
export const getCourseLessons = payload => ({
  type: Types.AllCourseLessons_Dispatch,
  payload,
});

export const toggleFavorite = payload => ({
  type: Types.ToggleFavorite_Dispatch,
  payload,
});
export const favoriteData = () => ({
  type: Types.GetFavorite_Dispatch,
});

export const createPlaylist = payload => ({
  type: Types.CreatePlaylist_Dispatch,
  payload,
});

export const getPlaylist = () => ({
  type: Types.GetPlaylist_Dispatch,
});

export const getPlaylistAudio = payload => ({
  type: Types.GetPlaylistAudio_Dispatch,
  payload,
});
export const updatePlayListAudios = payload => ({
  type: Types.updatePlaylistAudio_Dispatch,
  payload,
});

export const addAudioPlaylist = payload => ({
  type: Types.AddToPlaylist_Dispatch,
  payload,
});

export const removeAudioPlaylist = payload => ({
  type: Types.RemoveFromPlaylist_Dispatch,
  payload,
});

export const deleteFullPlaylist = payload => ({
  type: Types.DeletePlaylist_Dispatch,
  payload,
});

export const editPlaylist = payload => ({
  type: Types.EditPlaylist_Dispatch,
  payload,
});

export const sendAudioCount = payload => ({
  type: Types.SendAudioCount_Dispatch,
  payload,
});

export const handleAppStreak = () => ({type: Types.AppStreaks_Dispatch});
