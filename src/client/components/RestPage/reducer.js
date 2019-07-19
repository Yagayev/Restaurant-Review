import initialState from '../../initialState';
import {RestPageActionsConstants} from './constants.js';
import { List, Map} from 'immutable';

const RestPageReducer = (state = initialState.restPage, action) => {
    console.log('restPageReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        // case RestPageActionsConstants.UPDATE_REST_ID:
        //     return state.set('restId', action.payload.restId);
        case RestPageActionsConstants.LOAD_REST_INFO_SUCCSESS:
            state = state.set('rest', action.payload.rest);
            state = state.set('loading', false);
            console.log("RestPageReducer returning state=", state.toString());
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default RestPageReducer
