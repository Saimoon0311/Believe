import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/reducers';
import mySaga from './sagas/sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware),
);

// then run the saga
sagaMiddleware.run(mySaga);
