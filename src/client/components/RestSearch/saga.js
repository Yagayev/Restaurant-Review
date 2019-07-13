import {RestSearchActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestSearchActions from './actions'

function* loadRests(action){
  console.log('RestSearchSaga=', action);
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(RestSearchActions.loadRestsSuccessAction(json));
  } catch (e) {
    yield put(RestSearchActions.loadRestsFailureAction(e.message));
  }
}

function* RestSearchSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestSearchActionsConstants.LOAD_RESTS_ACTION, loadRests);
}

export default RestSearchSaga;
