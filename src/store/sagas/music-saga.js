import Types from '../saga-types';
import {call, put, takeLatest} from 'redux-saga/effects';
import TrackPlayer, {Capability} from 'react-native-track-player';

const audioFile = {
  url: require('../../Assets/tracks/Serenity.mp3'),
  title: 'Longing',
  artist: 'David Chavez',
  artwork: 'https://react-native-track-player.js.org/example/Longing.jpeg',
};

function* addMusicSaga(param) {
  console.log('addMusicSaga', param);
  const {appMusic} = param?.payload;
  if (appMusic) {
    const track = yield call(TrackPlayer.getCurrentTrack);
    if (track == null) {
      yield call(TrackPlayer.setupPlayer);
      yield call(TrackPlayer.updateOptions, {
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });
    }

    yield call(TrackPlayer.add, audioFile);
    yield call(TrackPlayer.play);
  } else TrackPlayer.destroy();
  yield put({type: Types.Auth_Update, payload: {appMusic}});
}
function* removeMusicSaga(param) {
  const {appMusic} = param?.payload;
  yield call(TrackPlayer.destroy);
  const track = yield call(TrackPlayer.getCurrentTrack);
  if (track == null) {
    yield call(TrackPlayer.setupPlayer);
    yield call(TrackPlayer.updateOptions, {
      stopWithApp: true,
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
  }
  yield call(TrackPlayer.add, audioFile);
  if (appMusic) yield call(TrackPlayer.play);
  yield put({type: Types.Auth_Update, payload: {appMusic}});
}
function* toggleMusicSaga(action) {
  const {play} = action?.payload;
  if (play) TrackPlayer.pause();
  else TrackPlayer.play();
}

function* musicSaga() {
  yield takeLatest(Types.addAudio_Dispatch, addMusicSaga);
  yield takeLatest(Types.removeAudio_Dispatch, removeMusicSaga);
  yield takeLatest(Types.toggleAudio_Dispatch, toggleMusicSaga);
}

export default musicSaga;
