import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import LoginReducer from './components/Login/reducer';
import SearchEngineReducer from './components/SearchEngine/reducer';
import RestSearchReducer from "./components/RestSearch/reducer";
import RestPageReducer from "./components/RestPage/reducer";
import AddReviewReducer from "./components/AddReview/reducer";
import UserPageReducer from "./components/UserPage/reducer";
import UpdateUserDetailsReducer from "./components/UpdateUserDetails/reducer";

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  login: LoginReducer,
  searchEngine: SearchEngineReducer,
  restSearch: RestSearchReducer,
  restPage: RestPageReducer,
  addReview: AddReviewReducer,
  userPage: UserPageReducer,
  updateUserDetails: UpdateUserDetailsReducer
});
