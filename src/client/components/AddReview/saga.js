import {AddReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
function* loadRest(action){
    console.log('loadRest SAGA=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AddReviewActionsConstants.loadRestSuccessAction(json));
    } catch (e) {
        yield put(AddReviewActionsConstants.loadRestFailureAction(e.message));
    }
}

function* AddReviewSaga() {
    yield takeEvery(AddReviewActionsConstants.LOAD_REST, loadRest);

    //using takeEvery, you take the action away from reducer to saga
    // yield takeEvery(AddReviewActionsConstants.LOAD_TAGS, loadTags);
}

export default AddReviewSaga;
