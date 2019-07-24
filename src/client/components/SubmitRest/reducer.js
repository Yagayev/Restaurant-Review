import initialState from '../../initialState';
import {SubmitRestActionsConstants} from './constants.js';
import { List } from 'immutable';
import {getFromStorage, setInStorage} from '../../utils/storage';


const SubmitRestReducer = (state = initialState.submitRest, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){

        case SubmitRestActionsConstants.UPDATE_REST_NAME:
            return state.set('name', action.payload.name);
        case SubmitRestActionsConstants.UPDATE_REST_DESCRIPTION:
            return state.set('description', action.payload.description);
        case SubmitRestActionsConstants.UPDATE_REST_LOCATION:
            return state.set('location', action.payload.location);



        case SubmitRestActionsConstants.SUBMIT_NEW_REST_SUCCESS:
            // setInStorage('restorant_review_username', state.newUsername);
            state = state.set('submitted', true);
            console.log("AAAAAAAAAAA", state);
            // state.set('redirect', action.payload.json.redirect);
            return state;
        case SubmitRestActionsConstants.SUBMIT_NEW_REST_FAIL:
            state = state.set('message', action.error);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default SubmitRestReducer
