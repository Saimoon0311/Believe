import API from './API';
import {Platform} from 'react-native';
const isIos = Platform.OS === 'ios';

/* It's a class that contains all the API calls for the content section of the app */
class ContentService {
  static allHomeContent = () => API.get('/home-content');
  static allLiveEvents = () => API.get('/live-events');
  static allReminders = () => API.get('/user-reminder');
  static allCategoryAndLibraries = () => API.get('/categories-libraries');
  static allContentLibraries = param => API.get(`/${param}`);
  static allReviewsService = param => API.get(`/${param}`);
  static postReviewService = ({params, sendParam}) =>
    API.post(`/${sendParam}`, params);
  static allLibraryAudios = ({id, requestParam}) =>
    API.get(`/${requestParam}=${id}`);
  static allCategoryVideos = ({id, requestParam}) =>
    API.get(`/${requestParam}=${id}`);
  static allCourses = _ => API.get('/all-lesson-cat');
  static allScripts = _ => API.get('/all-scripts');
  static allEBooks = _ => API.get('/all-ebooks');
  static allSeries = _ => API.get('/all-series');
  static allRingtones = _ => API.get('/meditation-ringtones');
  static allBackgrounds = _ => API.get('/all-med-backgrounds');
  static allCourseLessons = param =>
    API.get(`/lesson-cat-lessons?course_id=${param}`);

  static allNewLibraries = param => API.get(`/${param}`);

  static getFavorites = () => API.get('/favorites');

  static toggleFavorite = param => API.post('/favorite', param);
  static appStreak = param => API.post('/count-streak');

  static createPlaylistService = param => API.post('/create-playlist', param);

  static getPlaylistService = () => API.get('/playlist');

  static getPlaylistAudioService = ({id}) =>
    API.get(`/playlist-audios?playlist_id=${id}`);

  static addToPlaylistService = param => API.post('/add-to-playlist', param);

  static removePlaylistAudioService = param =>
    API.post('/remove-audio-playlist', param);

  static deletePlaylistService = ({id}) => API.delete(`delete-playlist/${id}`);

  static adddAudioCountService = param => API.post('/playcount', param);

  // static editPlaylistService = param => API.post('/edit-playlist', param);
  static editPlaylistService = param => {
    const formData = new FormData();
    Object.entries(param).forEach(([key, val]) => {
      if (key == 'image' && val?.type)
        formData.append(key, {
          name: val?.fileName || val?.name || 'image',
          type: val?.type,
          uri: isIos ? val?.uri.replace('file://', '') : val?.uri,
        });
      else formData.append(key, val);
    });
    // console.log(formData);
    return API.post('/update-playlist', formData);
  };
}

export default ContentService;
