import initialState from '../../initialState';
import {UserSearchActionsConstants} from './constants.js';
import { List, Map} from 'immutable';

const UserSearchReducer = (state = initialState.userSearch, action) => {
    console.log('user search reducer=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        // case UserSearchActionsConstants.UPDATE_USER_ID:
        //     return state.set('userId', action.payload.userId);
        case UserSearchActionsConstants.USER_SEARCH_QUERY:
            state = state.set('searchQuery', action.payload.searchQuery);
            return state;
        case UserSearchActionsConstants.USER_SEARCH_QUERY_SUCCESS:
            state = state.set('users', action.payload.users);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default UserSearchReducer
