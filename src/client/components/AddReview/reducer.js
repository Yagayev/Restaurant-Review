import initialState from '../../initialState';
import {AddReviewActionsConstants} from './constants.js';
import { List } from 'immutable';

const AddReviewReducer = (state = initialState.addReview, action) => {
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
        case AddReviewActionsConstants.UPDATE_RATING:
            return state.setIn(['ratings', action.payload.key], action.payload.rating);
        case AddReviewActionsConstants.SUBMIT_REVIEW_SUCCESS:
            return state.set('submitted', true);
        case AddReviewActionsConstants.LOAD_EXISTING_REVIEW_SUCCESS:
            state = state.set('ratings', action.review.ratings);
            state = state.set('description', action.review.description);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default AddReviewReducer
