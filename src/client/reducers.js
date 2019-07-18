import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import LoginReducer from './components/Login/reducer';
import SearchEngineReducer from './components/SearchEngine/reducer';
import RestSearchReducer from "./components/RestSearch/reducer";
import RestPageReducer from "./components/RestPage/reducer";

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  login: LoginReducer,
  searchEngine: SearchEngineReducer,
  restSearch: RestSearchReducer,
  restPage: RestPageReducer
});
