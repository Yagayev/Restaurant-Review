import { RestSearchActionsConstants } from './constants'
import initialState from '../../initialState'
import { List } from 'immutable'

const FILTERS = ['none', 'sepia(100%)', 'invert(100%)', 'grayscale(100%)', 'saturate(8)', 'blur(5px)']

const RestSearchReducer = (state = initialState.restSearch, action) => {
  console.log('GalleryReducerState=', state);
  switch (action.type){
    case RestSearchActionsConstants.UPDATE_GALLERY_WIDTH:
      console.log('RECEIVED: RestSearchActionsConstants.UPDATE_GALLERY_WIDTH');
      console.log('ACTION:', action);
      state = state.set('galleryWidth', action.payload.width);
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.LOAD_IMAGES_ACTION_SUCCESS:
      console.log('RECEIVED: RestSearchActionsConstants.LOAD_IMAGES_ACTION_SUCCESS');
      console.log('ACTION:', action);
      state = state.set('images', new List(action.payload.images));
      let loadActiveFilter = List();
      action.payload.images.map(() => loadActiveFilter.push(FILTERS[0]));
      state = state.set('activeFilter', loadActiveFilter);
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.DELETE_ACTION:
      console.log('RestSearchActionsConstants.DELETE_ACTION');
      console.log('ACTION:', action);
      state = state.update('images', e => e.delete(action.idx));
      state = state.update('activeFilter', e => e.delete(action.idx));
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.CLONE_ACTION:
      console.log('RECEIVED: RestSearchActionsConstants.CLONE_ACTION');
      console.log('ACTION:', action);
      state = state.update('images', e => e.push(state.getIn(['images', action.idx])));
      state = state.update('activeFilter', e => e.push(FILTERS[0]));
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.APPLY_FILTER_ACTION:
      console.log('RECEIVED: RestSearchActionsConstants.APPLY_FILTER_ACTION');
      console.log('ACTION:', action);
      console.log('STATE:', state);
      state = state.setIn(['activeFilter', action.idx],
        FILTERS[Math.floor(Math.random() * Math.floor(FILTERS.length))]);
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.SET_ACTIVE_IMAGE:
      console.log('RECEIVED: RestSearchActionsConstants.SET_ACTIVE_IMAGE');
      console.log('ACTION:', action);
      state = state.set('activeImage', action.idx);
      state = state.set('openLightBox', true);
      console.log('NEW STATE=', state);
      return state;
    case RestSearchActionsConstants.UNSET_ACTIVE_IMAGE:
      console.log('RECEIVED: RestSearchActionsConstants.UNSET_ACTIVE_IMAGE');
      console.log('ACTION:', action);
      state = state.set('openLightBox', false);
      console.log('NEW STATE=', state);
      return state;

      //TODO delete the above
    // case RestSearchActionsConstants.GO_TO_REST_ACTION:
    //   console.log('RECEIVED: RestSearchActionsConstants.GO_TO_REST_ACTION');
    //   console.log('ACTION:', action);
    //   console.log("AAAAAAAAAAAAAAAAAAAAA\AAAAAAAAA\AAAA");
    //   console.log('reducing go to rest');
    //   return state;

    case RestSearchActionsConstants.LOAD_RESTS_ACTION_SUCCESS:
      console.log('RECEIVED: RestSearchActionsConstants.LOAD_IMAGES_ACTION_SUCCESS');
      console.log('ACTION:', action);
      state = state.set('rests', new List(action.payload.rests));
      console.log('NEW STATE=', state);
      return state;
    default: //otherwise state is lost!
      return state;
  }
};

export default RestSearchReducer
