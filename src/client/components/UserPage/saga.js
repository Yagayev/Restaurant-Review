import { UserPageActionsConstants } from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserPageActions from './actions'

function* loadUserInfo(action){
    console.log('loadUserInfo=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': action.payload.token,
                    'username': action.payload.username,
                    'usertoview': action.payload.usertoview
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserPageActions.loadUserInfoSuccessAction(json));
    } catch (e) {
        yield put(UserPageActions.loadUserInfoFailureAction(e.message));
    }
}

function* UserPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UserPageActionsConstants.LOAD_USER_INFO, loadUserInfo);
}

export default UserPageSaga;
