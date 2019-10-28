import { RestPageActionsConstants } from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestPageActions from './actions'
import {UserPageActionsConstants} from "../UserPage/constants";
import UserPageActions from "../UserPage/actions";

function* loadRestInfo(action){
    // console.log('loadRestInfo=', action);
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

function* deleteReview(action){
    // console.log('delete review=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': action.payload.token,
                    'username': action.payload.username,
                    'reviewid': action.payload.reviewid,
                    'restid': action.payload.restid
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        // console.log("return delete review,", json);
        yield put(RestPageActions.loadRestInfo(action.payload.restid));
    } catch (e) {
        yield put(RestPageActions.loadRestInfoFailureAction(e.message));
    }
}

function* RestPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestPageActionsConstants.LOAD_REST_INFO, loadRestInfo);
    yield takeEvery(RestPageActionsConstants.DELETE_REST_REVIEW, deleteReview);

}

export default RestPageSaga;
