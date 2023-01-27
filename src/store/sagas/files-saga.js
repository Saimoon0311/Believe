import {call, takeLatest} from 'redux-saga/effects';
import {hasKey} from '@/services/storage';
import Types from '../saga-types';
import cache from '@/utils/helper/cache';

function* saveFilesSaga(action) {
  const {payload} = action;
  const hasDownload = yield call(hasKey, 'downloadedFiles');
  // const savesFiles = (hasDownload && cache.get('downloadedFiles')) || [];
  const savesFiles = cache.get('downloadedFiles');
  yield call(cache.store, 'downloadedFiles', [...savesFiles, payload]);
}

function* filesSaga() {
  yield takeLatest(Types.saveFiles, saveFilesSaga);
}

export default filesSaga;
