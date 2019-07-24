import { UserSearchActionsConstants } from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserPageActions from './actions'

function* queryUsers(action){
    console.log('user search saga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': action.payload.token,
                    'username': action.payload.username,
                    'searchquery': action.payload.searchQuery
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("search saga recieved = ", json)
        yield put(UserPageActions.userSearchQuerySuccessAction(json));
    } catch (e) {
        yield put(UserPageActions.userSearchQueryFailAction(e.message));
    }
}

function* UserSearchSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UserSearchActionsConstants.USER_SEARCH_QUERY, queryUsers);
}

export default UserSearchSaga;
