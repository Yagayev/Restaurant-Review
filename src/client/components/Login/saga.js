import {LoginActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import LoginActions from './actions'
import UpdateUserDetailsActions from "../UpdateUserDetails/actions";
import {UpdateUserDetailsActionsConstants} from "../UpdateUserDetails/constants";

function* loadTags(action){
    console.log('MenuSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(LoginActions.loadTagsSuccessAction(json));
    } catch (e) {
        yield put(LoginActions.loadTagsFailureAction(e.message));
    }
}

function* login(action){
  console.log('LoginSaga=', action);
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
    yield put(LoginActions.loginSuccessAction(json));
  } catch (e) {
    yield put(LoginActions.loginFailureAction(e.message));
  }
}

function* signup(action){
    console.log('signup saga=', action);
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
        yield put(LoginActions.signupSuccessAction(json));
    } catch (e) {
        yield put(LoginActions.signupFailureAction(e.message));
    }
}

function* disconnect(action){
    console.log('signup saga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    username: action.payload.username,
                    token: action.payload.token
                },

            });
        const json = yield call([res, 'json']); //retrieve body of response
        // yield put(LoginActions.signupSuccessAction(json));
    } catch (e) {
        // yield put(LoginActions.signupFailureAction(e.message));
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
        yield put(LoginActions.loadLocationsCompleteAction(json));
    } catch (e) {
        yield put(LoginActions.loadTagsFailureAction(e.message));
    }
}

function* LoginSaga() {
    //using takeEvery, you take the action away from reducer to saga

    yield takeEvery(LoginActionsConstants.LOGIN, login);
    yield takeEvery(LoginActionsConstants.SIGNUP, signup);
    yield takeEvery(LoginActionsConstants.DISCONNECT, disconnect);
    yield takeEvery(LoginActionsConstants.LOAD_LOCATIONS, loadLocations);


}

export default LoginSaga;
