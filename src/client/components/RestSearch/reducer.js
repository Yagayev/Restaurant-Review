import { RestSearchActionsConstants } from './constants'
import initialState from '../../initialState'
import { List } from 'immutable'

const FILTERS = ['none', 'sepia(100%)', 'invert(100%)', 'grayscale(100%)', 'saturate(8)', 'blur(5px)']

const RestSearchReducer = (state = initialState.restSearch, action) => {
  console.log('GalleryReducerState=', state);
  switch (action.type){

    case RestSearchActionsConstants.LOAD_RESTS_ACTION_SUCCESS:
      console.log('RECEIVED: RestSearchActionsConstants.LOAD_IMAGES_ACTION_SUCCESS');
      console.log('ACTION:', action);
      state = state.set('rests', new List(action.payload.rests));
      state = state.set('lat', action.payload.lat);
      state = state.set('lng', action.payload.lng);
      console.log('NEW STATE=', state);
      return state;
    default: //otherwise state is lost!
      return state;
  }
};

export default RestSearchReducer
