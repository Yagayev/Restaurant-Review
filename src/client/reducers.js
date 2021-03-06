import { combineReducers } from 'redux';
import LoginReducer from './components/Login/reducer';
import SearchEngineReducer from './components/SearchEngine/reducer';
import RestSearchReducer from "./components/RestSearch/reducer";
import RestPageReducer from "./components/RestPage/reducer";
import AddReviewReducer from "./components/AddReview/reducer";
import UserPageReducer from "./components/UserPage/reducer";
import UpdateUserDetailsReducer from "./components/UpdateUserDetails/reducer";
import SubmitRestReducer from "./components/SubmitRest/reducer";
import UserSearchReducer from "./components/UserSearch/reducer";

export default combineReducers({
  login: LoginReducer,
  searchEngine: SearchEngineReducer,
  restSearch: RestSearchReducer,
  restPage: RestPageReducer,
  addReview: AddReviewReducer,
  userPage: UserPageReducer,
  updateUserDetails: UpdateUserDetailsReducer,
  submitRest: SubmitRestReducer,
  userSearch: UserSearchReducer
});
