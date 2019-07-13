import initialState from '../../initialState';
import {SearchEngineActionsConstants} from './constants.js';
import { List } from 'immutable';

const SearchEngineReducer = (state = initialState.searchEngine, action) => {
    console.log('SearchEngineReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        // case SearchEngineActionsConstants.UPDATE_TAG:
        //     return state.set('tag', action.payload.tag);
        // case SearchEngineActionsConstants.LOAD_TAGS_SUCCESS:
        //     let res = action.payload.tags.map(elm => {
        //         return {label: elm, value: elm }
        //     });
        //     return state.set('tags', new List(res));
        case SearchEngineActionsConstants.UPDATE_NAME:
            return state.set('name', action.payload.name);
        case SearchEngineActionsConstants.ADVANCED_OPEN:
            return state.set('advanced', true);
        case SearchEngineActionsConstants.ADVANCED_CLOSE:
            return state.set('advanced', false);
        case SearchEngineActionsConstants.UPDATE_RATING:
            return state.setIn(['ratings', action.payload.key], action.payload.rating);
        default: //otherwise state is lost!
            return state;
    }
};

export default SearchEngineReducer