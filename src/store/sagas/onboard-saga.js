import Types from '../saga-types';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as OnBoardService from '@/services/onboard-service';

function* getAllGoalsSaga() {
  const {ok, data, originalError} = yield call(OnBoardService.GoalsService);
  if (ok) {
    const {goals} = data || {};
    yield put({
      type: Types.OnBoard_Update,
      payload: {goalData: goals},
    });
  } else {
    console.log(ok, data, originalError);
  }
}

function* getAllFeelingsSaga() {
  const {ok, data, originalError} = yield call(OnBoardService.FeelingsService);
  if (ok) {
    const {feelings} = data || {};
    yield put({
      type: Types.OnBoard_Update,
      payload: {feelingData: feelings},
    });
  } else {
    console.log(ok, data, originalError);
  }
}

function* getAllTracksSaga() {
  const {ok, data, originalError} = yield call(OnBoardService.TrackService);
  if (ok) {
    const {tracks, gender, age} = data || {};
    yield put({
      type: Types.OnBoard_Update,
      payload: {trackData: tracks, genderData: gender, ageData: age},
    });
  } else {
    console.log(ok, data, originalError);
  }
}

function* getRecentlySearch() {
  const {ok, data, originalError} = yield call(OnBoardService.RecentlySearch);
  console.log("ok", ok)
  if (ok) {
    const {recently_searched} = data || {};
    yield put({
      type: Types.OnSearch_Update,
      payload: {recentlySearch: recently_searched},
    });
  } else {
    console.log(ok, data, originalError);
  }
}

function* getSuggestedData() {
  const {ok, data, originalError} = yield call(OnBoardService.SuggestedSearch);
  if (ok) {
    const arr = data || {};
    yield put({
      type: Types.OnSearch_Update,
      payload: {suggestedSearch: arr},
    });
  } else {
    console.log(ok, data, originalError);
  }
}

function* getSearch(param) {
  console.log('params =>',param.payload)
  const {ok, data, originalError} = yield call(OnBoardService.Search,param.payload);
  if (ok) {
    const {audios} = data || {};
    yield put({
      type: Types.OnSearch_Update,
      payload: {searchingResult: audios},
    });
  } else {
    yield put({
      type: Types.OnSearch_Update,
      payload: {searchingResult: []},
    });
    console.log(ok, data, originalError);
  }
}

function* contentSaga() {
  yield takeLatest(Types.OnBoardGoals_Dispatch, getAllGoalsSaga);
  yield takeLatest(Types.OnBoardFeelings_Dispatch, getAllFeelingsSaga);
  yield takeLatest(Types.OnBoardTracks_Dispatch, getAllTracksSaga);

  yield takeLatest(Types.getRecentlySearch, getRecentlySearch);
  yield takeLatest(Types.getSuggestedKeyword, getSuggestedData);
  yield takeLatest(Types.searching, getSearch);
}

export default contentSaga;
