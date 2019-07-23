import { UserPageActionsConstants} from './constants.js';


function loadUserInfo(token, username, usertoview) {
    return {
        type: UserPageActionsConstants.LOAD_USER_INFO,
        uri: '/api/account/viewUser',
        payload: {
            token: token,
            username: username,
            usertoview: usertoview
        }
    }
}

function loadUserInfoSuccessAction(json){
    if(!json.success){
        return loadUserInfoFailureAction(json.message)
    }
    return {
        type: UserPageActionsConstants.LOAD_USER_INFO_SUCCSESS,
        payload: {
            user: json.user
        }
    }
}
function loadUserInfoFailureAction(message){
    return {
        type: UserPageActionsConstants.LOAD_USER_INFO_FAIL,
        message: message
    }
}



let UserPageActions  = {
    loadUserInfo,
    loadUserInfoSuccessAction,
    loadUserInfoFailureAction
};

export default UserPageActions
