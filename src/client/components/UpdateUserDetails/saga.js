import {UpdateUserDetailsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UpdateUserDetailsActions from './actions'
import LoginActions from "../Login/actions";
import SearchEngineActions from "../SearchEngine/actions";
import {SearchEngineActionsConstants} from "../SearchEngine/constants";


function* updateUserDetails(action){
  console.log('SubmitRestSaga=', action);
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
    if(action.payload.updates.username){
        yield put(LoginActions.setNewUsernameAction(action.payload.updates.username));
    }
    // else{
        yield put(UpdateUserDetailsActions.updateUserDetailsSuccessAction());
    // }


  } catch (e) {
    yield put(UpdateUserDetailsActions.updateUserDetailsFailureAction(e.message));
  }
}

function* loadLocations(action){
    console.log('LOAD LOCATIONS=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UpdateUserDetailsActions.loadLocationsCompleteAction(json));
    } catch (e) {
        yield put(UpdateUserDetailsActions.loadTagsFailureAction(e.message));
    }
}



function* UpdateUserDetailsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UpdateUserDetailsActionsConstants.LOAD_LOCATIONS, loadLocations);
    yield takeEvery(UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS, updateUserDetails);

}

export default UpdateUserDetailsSaga;
