import {all} from 'redux-saga/effects';
import Auth_Saga from './auth-saga';
import Content_Saga from './content-saga';
import Onboard_Saga from './onboard-saga';
import music_Saga from './music-saga';
import filesSaga from './files-saga';

function* rootSaga() {
  yield all([
    Auth_Saga(),
    Content_Saga(),
    Onboard_Saga(),
    music_Saga(),
    filesSaga(),
  ]);
}

export default rootSaga;
