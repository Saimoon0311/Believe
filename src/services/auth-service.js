import API from './API';
import {Platform} from 'react-native';
const isIos = Platform.OS === 'ios';

/* It's a class that contains static methods that make API calls */
class AuthService {
  static register = param => API.post('/register', param);

  static login = param => API.post('/login', param);

  static verifyUser = _ => API.get('/verify');
  static updateStreak = _ => API.get('/update-streak');

  static forgot = param => API.post('/forgot_password', param);

  static verification = param => API.post('/send_token', param);
  static updatePassword = param => API.post('/confirm_password', param);
  static verifySocialUser = param => API.post('/firebase', param);
  static firebaseLogin = param => API.post('/firebase-login', param);
  static firebaseSignUp = param => API.post('/firebase-signup', param);
  static fcmTokenAdd = param => API.post('/add-fcm-token', param);
  static updateProfileService = param => {
    const formData = new FormData();
    Object.entries(param).forEach(([key, val]) => {
      if (key == 'profile_image' && val?.type)
        formData.append(key, {
          name: val?.fileName || val?.name || 'image',
          type: val?.type,
          uri: isIos ? val?.uri.replace('file://', '') : val?.uri,
        });
      else formData.append(key, val);
    });
    return API.post('/update_profile', formData);
  };
}

export default AuthService;
