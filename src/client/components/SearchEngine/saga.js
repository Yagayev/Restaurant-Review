import {SearchEngineActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import SearchEngineActions from './actions'

function* loadLocations(action){
    // console.log('LOAD LOCATIONS=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(SearchEngineActions.loadLocationsCompleteAction(json));
    } catch (e) {
        // yield put(SearchEngineActions.loadTagsFailureAction(e.message));
    }
}

function* SearchEngineSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(SearchEngineActionsConstants.LOAD_LOCATIONS, loadLocations);
}

export default SearchEngineSaga;
