import { UserSearchActionsConstants} from './constants.js';


function userSearchQueryAction(token, username, searchQuery) {
    return {
        type: UserSearchActionsConstants.USER_SEARCH_QUERY,
        uri: '/api/account/userSearch',
        payload: {
            token: token,
            username: username,
            searchQuery: searchQuery
        }
    }
}

function userSearchQuerySuccessAction(json) {
    if(!json.success){
        userSearchQueryFailAction(json.message)
    }
    return {
        type: UserSearchActionsConstants.USER_SEARCH_QUERY_SUCCESS,
        payload: {
            users: json.users
        }
    }
}

function userSearchQueryFailAction(error) {
    return {
        type: UserSearchActionsConstants.USER_SEARCH_QUERY_FAIL,
        payload: {
            error: error
        }
    }
}


let UserPageActions  = {
    userSearchQueryAction,
    userSearchQuerySuccessAction,
    userSearchQueryFailAction
};

export default UserPageActions
