import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import AppSaga from './components/App/saga'
import LoginSaga from './components/Login/saga'
import SearchEngineSaga from "./components/SearchEngine/saga";
import RestSearchSaga from "./components/RestSearch/saga";
import RestPageSaga from "./components/RestPage/saga";
import AddReviewSaga from "./components/AddReview/saga";
import UserPageSaga from "./components/UserPage/saga";
import UpdateUserDetailsSaga from "./components/UpdateUserDetails/saga";
import SubmitRestSaga from "./components/SubmitRest/saga";
import UserSearchSaga from "./components/UserSearch/saga";

export default function* Sagas() {
    yield all([
        AppSaga(),
        GallerySaga(),
        LoginSaga(),
        SearchEngineSaga(),
        RestSearchSaga(),
        RestPageSaga(),
        AddReviewSaga(),
        UserPageSaga(),
        UpdateUserDetailsSaga(),
        SubmitRestSaga(),
        UserSearchSaga()
    ])
}
