import initialState from '../../initialState';
import {UserPageActionsConstants} from './constants.js';
import { List, Map} from 'immutable';

const UserPageReducer = (state = initialState.userPage, action) => {
    // console.log('userPageReducerState=', state);
    // console.log('RECEIVED ACTION:', action);
    switch (action.type){
        // case UserSearchActionsConstants.UPDATE_USER_ID:
        //     return state.set('userId', action.payload.userId);
        case UserPageActionsConstants.LOAD_USER_INFO_SUCCSESS:
            state = state.set('userViewing', action.payload.user);
            state = state.set('loading', false);
            // console.log("UserPageReducer returning state=", state.toString());
            return state;
        case UserPageActionsConstants.UPDATE_FILE:
            state = state.set('new_image', action.payload.file);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default UserPageReducer
