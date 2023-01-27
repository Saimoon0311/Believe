import {call, put, takeLatest, delay} from 'redux-saga/effects';
import AuthService from '@/services/auth-service';
import {
  getToken,
  hasKey,
  removeToken,
  storeToken,
  storeValue,
} from '@/services/storage';
import {updateAuth} from '../actions/auth-action';
import {showError, showSuccess} from '@/services/SnackBar';
import Types from '../saga-types';
import SplashScreen from 'react-native-splash-screen';
import SocialLogin from '@/services/SocialLogin';
import auth from '@react-native-firebase/auth';
import {statusCodes} from '@react-native-google-signin/google-signin';
import NavigationService from '@/services/NavigationService';
import {
  getFbResult,
  loginUser,
  registerUser,
  resetUserEmail,
  signInWithFirebase,
} from '@/utils/helper';
import cache from '@/utils/helper/cache';

const handleNewUser = ({audio, params}) => {
  NavigationService.navigate('Subscription', {
    audio,
    ...params,
    isSignUp: true,
  });
};

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/* This function is used to add the fcm token to the database. */
function* fcmTokenSaga(action) {
  yield call(AuthService.fcmTokenAdd, action.payload);
}

/* This is a generator function which is used to login the user. */
function* loginSaga(action) {
  try {
    yield put(updateAuth({loading: true}));
    yield call(loginUser, action.payload);
    const idTokenResult = yield call(getFbResult);
    const jwtToken = idTokenResult.token;
    if (jwtToken) {
      const {ok, data} = yield call(AuthService.firebaseLogin, {
        token: jwtToken,
      });
      if (ok) {
        const {detail, token} = data;
        storeToken('USER/TOKEN', token);
        cache.store('/verify', detail);
        yield put(updateAuth({user: detail, isLogin: true, token}));
        showSuccess(data?.message);
      } else showError(data?.message);
    }
  } catch (error) {
    showError(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(updateAuth({loading: false}));
  }
}

/* This is a generator function which is used to signup the user. */
function* signUpSaga(action) {
  try {
    yield put(updateAuth({loading: true}));
    yield call(registerUser, action.payload);
    const idTokenResult = yield call(getFbResult);
    const jwtToken = idTokenResult.token;
    const {params, name} = action.payload;
    if (jwtToken) {
      const {ok, data} = yield call(AuthService.firebaseSignUp, {
        token: jwtToken,
        name,
        timezone,
        age: params?.age?.name,
        usergoal_ids: params?.goals,
        gender: params?.gender?.name,
        userfeeling_ids: params?.feeling,
      });
      if (ok) {
        const {detail, token, audio} = data;
        yield put(updateAuth({user: detail, isLogin: true, token}));
        storeToken('USER/TOKEN', token);
        cache.store('/verify', detail);
        yield call(handleNewUser, {params, audio});
        showSuccess(data?.message);
      } else showError(data?.message);
    }
  } catch (error) {
    showError(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(updateAuth({loading: false}));
  }
}

/**
 * It signs the user out of the app
 */
const authLogout = () => auth().signOut();

/* A generator function which is used to logout the user. */
function* logOutSaga() {
  try {
    const downloads = cache.get('downloadedFiles') || [];
    yield call(removeToken);
    yield put({type: Types.LogOut});
    yield call(authLogout);
    cache.store('downloadedFiles', downloads);
  } catch (error) {
    console.log(error);
  }
}

/* This function is used to verify the user. */
function* verifyUserSaga() {
  try {
    setTimeout(() => SplashScreen.hide(), 100);
    yield put(updateAuth({showAnimatedSplash: true}));
    if (!hasKey('background')) storeValue('background', 'true');
    const token = yield call(getToken) || {};
    console.log('token verifyUserSaga', token);
    if (token) {
      yield put(updateAuth({token}));
      const {ok, data} = yield call(AuthService.verifyUser);
      yield call(AuthService.updateStreak);
      if (ok) yield put(updateAuth({user: data, isLogin: true}));
    }
  } catch (error) {
    showError(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => SplashScreen.hide(), 100);
  }
}

/* This function is used to reset the user password. */
function* forgotUserSaga(action) {
  try {
    yield put(updateAuth({loading: true}));
    yield call(resetUserEmail, action.payload);
    showSuccess('Password Reset Request has been sent to your mail');
    NavigationService.navigate('Login');
  } catch (error) {
    showError(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(updateAuth({loading: false}));
  }
}

/* This function is used to verify the user. */
function* verificationSaga(action) {
  const {ok, data, originalError} = yield call(
    AuthService.verification,
    action.payload,
  );
  if (ok) {
    yield put(updateAuth({verification: true, verifyToken: data?.token}));
    showSuccess(data?.message);
    yield put(updateAuth({verification: false}));
  } else {
    const message = data?.message || originalError?.message;
    showError(message);
  }
}

/* This function is used to update the user profile. */
function* updateProfileSaga(action) {
  const {ok, data, originalError} = yield call(
    AuthService.updateProfileService,
    action.payload,
  );
  if (ok) {
    const {user} = data;
    yield put(updateAuth({update: true, user}));
    showSuccess(data?.message);
  } else {
    const message = data?.message || originalError?.message;
    showError(message);
  }
}

/* This function is used to update the user password. */
function* updatePasswordSaga(action) {
  const {ok, data, originalError} = yield call(
    AuthService.updatePassword,
    action.payload,
  );
  if (ok) {
    yield put(updateAuth({update: true, verifyToken: ''}));
    showSuccess(data?.message);
    delay(1000);
    yield put(updateAuth({update: false}));
  } else {
    const message = data?.message || originalError?.message;
    showError(message);
  }
}

/* This function is used to login the user with the social media. */
function* socialLoginSaga({payload}) {
  try {
    const {provider, params} = payload;
    const response = yield call(SocialLogin[`logInWith${provider?.name}`]);
    yield put(updateAuth({loading: true}));
    yield call(
      signInWithFirebase,
      provider?.name == 'apple' ? response.token : response,
    );
    const idTokenResult = yield call(getFbResult);
    const jwtToken = idTokenResult.token;
    if (jwtToken) {
      const endPoints = params
        ? AuthService.firebaseSignUp
        : AuthService.firebaseLogin;

      const {ok, data} = yield call(endPoints, {
        token: jwtToken,
        name: response?.name || '',
        timezone,
        age: params?.age?.name,
        usergoal_ids: params?.goals,
        gender: params?.gender?.name,
        userfeeling_ids: params?.feeling,
      });
      if (ok) {
        const {detail, token, audio} = data;
        yield put(updateAuth({user: detail, isLogin: true, token}));
        storeToken('USER/TOKEN', token);
        if (params) yield call(handleNewUser, {params, audio});
        showSuccess('User has been login now');
      } else showError(data?.message);
    }
  } catch (error) {
    switch (error?.code || error?.message) {
      case statusCodes.SIGN_IN_CANCELLED:
      case '1001':
        showError('Cancelled');
        break;
      case statusCodes.IN_PROGRESS:
        console.log('In progress');
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        showError('Play services not available or outdated');
        break;
      default:
        showError(error?.message || 'Something went wrong');
        break;
    }
  } finally {
    yield put(updateAuth({loading: false}));
  }
}

function* getUserSaga() {
  try {
    const {ok, data} = yield call(AuthService.verifyUser);
    if (ok) yield put(updateAuth({user: data}));
  } catch (error) {
    showError(error?.message?.split(' ')?.slice(1)?.join(' '));
  }
}

/* A generator function which is used to listen to the actions. */
function* authSaga() {
  yield takeLatest(Types.Login_Dispatch, loginSaga);
  yield takeLatest(Types.SignUp_Dispatch, signUpSaga);
  yield takeLatest(Types.LogOut_Dispatch, logOutSaga);
  yield takeLatest(Types.Verify_Dispatch, verifyUserSaga);
  yield takeLatest(Types.Forgot_Dispatch, forgotUserSaga);
  yield takeLatest(Types.Verification_Dispatch, verificationSaga);
  yield takeLatest(Types.Update_Dispatch, updatePasswordSaga);
  yield takeLatest(Types.SocialLogin_Dispatch, socialLoginSaga);
  yield takeLatest(Types.UpdateProfile_Dispatch, updateProfileSaga);
  yield takeLatest(Types.FCMToken_Dispatch, fcmTokenSaga);
  yield takeLatest(Types.getUser_Dispatch, getUserSaga);
}

export default authSaga;
