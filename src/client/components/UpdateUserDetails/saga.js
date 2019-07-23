import {UpdateUserDetailsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UpdateUserDetailsActions from './actions'
import LoginActions from "../Login/actions";


function* updateUserDetails(action){
  console.log('UpdateUserDetailsSaga=', action);
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
    // yield put(UpdateUserDetailsActions.updateUserDetailsSuccessAction(json));
    yield put(LoginActions.disconnectAction());
  } catch (e) {
    yield put(UpdateUserDetailsActions.updateUserDetailsFailureAction(e.message));
  }
}

function* UpdateUserDetailsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS, updateUserDetails);

}

export default UpdateUserDetailsSaga;
