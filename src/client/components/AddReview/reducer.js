import initialState from '../../initialState';
import {AddReviewActionsConstants} from './constants.js';
import { List } from 'immutable';
import {SearchEngineActionsConstants} from "../SearchEngine/constants";

const AddReviewReducer = (state = initialState.searchEngine, action) => {
    console.log('SearchEngineReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        // case AddReviewActionsConstants.UPDATE_TAG:
        //     return state.set('tag', action.payload.tag);
        // case AddReviewActionsConstants.LOAD_TAGS_SUCCESS:
        //     let res = action.payload.tags.map(elm => {
        //         return {label: elm, value: elm }
        //     });
        //     return state.set('tags', new List(res));
        case AddReviewActionsConstants.UPDATE_DESCRIPTION:
            return state.set('description', action.payload.description);
        case SearchEngineActionsConstants.UPDATE_RATING:
            return state.setIn(['ratings', action.payload.key], action.payload.rating);
        default: //otherwise state is lost!
            return state;
    }
};

export default AddReviewReducer
