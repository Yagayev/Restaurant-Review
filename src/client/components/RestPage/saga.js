import { RestPageActionsConstants } from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestPageActions from './actions'

function* loadRestInfo(action){
    console.log('loadRestInfo=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'restid': action.payload.restId
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(RestPageActions.loadRestInfoSuccessAction(json));
    } catch (e) {
        yield put(RestPageActions.loadRestInfoFailureAction(e.message));
    }
}

function* RestPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestPageActionsConstants.LOAD_REST_INFO, loadRestInfo);
}

export default RestPageSaga;
