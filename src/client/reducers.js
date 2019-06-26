import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import LoginReducer from './components/Login/reducer';


export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  login: LoginReducer
});
