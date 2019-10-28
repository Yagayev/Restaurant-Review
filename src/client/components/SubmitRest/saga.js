import {SubmitRestActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import SubmitRestActions from './actions'
import LoginActions from "../Login/actions";


function* submitRest(action){
  // console.log('SubmitRestSaga=', action);
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
    // yield put(UpdateUserDetailsActions.submitRestSuccessAction(json));
    yield put(SubmitRestActions.submitRestSuccessAction(json));
  } catch (e) {
    yield put(SubmitRestActions.submitRestFailureAction(e.message));
  }
}

function* SubmitRestSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(SubmitRestActionsConstants.SUBMIT_NEW_REST, submitRest);

}

export default SubmitRestSaga;
