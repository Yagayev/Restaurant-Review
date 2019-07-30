import initialState from '../../initialState';
import {SearchEngineActionsConstants} from './constants.js';
import { List } from 'immutable';

const SearchEngineReducer = (state = initialState.searchEngine, action) => {
    console.log('SearchEngineReducerState=', state);
    console.log('SearchEngineReducerRECEIVED ACTION:', action);
    switch (action.type){
        // case AddReviewActionsConstants.UPDATE_TAG:
        //     return state.set('tag', action.payload.tag);
        // case AddReviewActionsConstants.LOAD_TAGS_SUCCESS:
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
        case SearchEngineActionsConstants.VIEW_MAP_SET:
            return state.set('viewOnMap', true);
        case SearchEngineActionsConstants.VIEW_MAP_UNSET:
            return state.set('viewOnMap', false);
        case SearchEngineActionsConstants.UPDATE_CLOSER_BETTER:
            return state.set('distanceVsScore', action.payload.distanceVsScore);
        case SearchEngineActionsConstants.UPDATE_RATING:
            return state.setIn(['ratings', action.payload.key], action.payload.rating);
        case SearchEngineActionsConstants.COMPLETE_LOAD_LOCATIONS:
            // let res = action.payload.locations.map(elm => {
            //     return {label: elm, value: elm }
            // });
            state = state.set('locations', action.payload.locations);
            console.log("SearchEngineReducer returninh", state);
            return state;
        case SearchEngineActionsConstants.UPDATE_SUGGESTION:
            // let res2 = action.payload.locations.map(elm => {
            //     return {label: elm, value: elm }
            // });
            return state.set('suggestedLocations', action.payload.locations);
        case SearchEngineActionsConstants.UPDATE_LOC:
            return state.set('loc', action.payload.location);
        default: //otherwise state is lost!
            return state;
    }
};

export default SearchEngineReducer
