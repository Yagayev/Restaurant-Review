import initialState from '../../initialState';
import {UpdateUserDetailsActionsConstants} from './constants.js';
import { List } from 'immutable';
import {getFromStorage, setInStorage} from '../../utils/storage';
import {SearchEngineActionsConstants} from "../SearchEngine/constants";


const UpdateUserDetailsReducer = (state = initialState.updateUserDetails, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){

        case UpdateUserDetailsActionsConstants.UPDATE_NEW_USERNAME:
            return state.set('newUsername', action.payload.newUsername);
        case UpdateUserDetailsActionsConstants.UPDATE_NEW_PASSWORD:
            return state.set('password', action.payload.password);
        case UpdateUserDetailsActionsConstants.UPDATE_NEW_LOCATION:
            return state.set('location', action.payload.location);
        case UpdateUserDetailsActionsConstants.UPDATE_USER_COORDS:
            return state.set('coords', action.payload.coords);



        case UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS_SUCCESS:
            state = state.set('password', '');
            state = state.set('message', action.payload.json.message);
            // setInStorage('restorant_review_username', state.newUsername);
            state.set('submitted', true);
            return state;
        case UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS_FAIL:
            state = state.set('message', action.error);
            return state;

        case UpdateUserDetailsActionsConstants.COMPLETE_LOAD_LOCATIONS:
            // let res = action.payload.locations.map(elm => {
            //     return {label: elm, value: elm }
            // });
            state = state.set('locations', action.payload.locations);
            console.log("SearchEngineReducer returninh", state);
            return state;
        case UpdateUserDetailsActionsConstants.UPDATE_SUGGESTION:
            // let res2 = action.payload.locations.map(elm => {
            //     return {label: elm, value: elm }
            // });
            return state.set('suggestedLocations', action.payload.locations);
        case UpdateUserDetailsActionsConstants.UPDATE_LOC:
            return state.set('loc', action.payload.location);
        default: //otherwise state is lost!
            return state;
    }
};

export default UpdateUserDetailsReducer
