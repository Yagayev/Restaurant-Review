import {AddReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AddReviewActions from "./actions";

function* submitReview(action){
    console.log('submitReview SAGA=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload.review)

            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AddReviewActions.submitReviewSuccessAction(json));
    } catch (e) {
        yield put(AddReviewActions.submitReviewFailureAction(e.message));
    }
}

function* loadReview(action){
    console.log('submitReview SAGA=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'username': action.payload.username,
                    'token': action.payload.token,
                    'restname': action.payload.restName
                },

            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AddReviewActions.loadExistingReviewSuccessAction(json));
    } catch (e) {
        // yield put(AddReviewActions.submitReviewFailureAction(e.message));
    }
}

function* AddReviewSaga() {
    yield takeEvery(AddReviewActionsConstants.SUBMIT_REVIEW, submitReview);
    yield takeEvery(AddReviewActionsConstants.LOAD_EXISTING_REVIEW, loadReview);


    //using takeEvery, you take the action away from reducer to saga
    // yield takeEvery(AddReviewActionsConstants.LOAD_TAGS, loadTags);
}

export default AddReviewSaga;
