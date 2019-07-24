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

function deleteReviewAction(token, username, reviewid, restid){
    return {
        type: UserPageActionsConstants.DELETE_USER_REVIEW,
        uri: '/api/reviews/deleteReview',
        payload:{
            token,
            username,
            reviewid,
            restid
        }
    }
}


// function deleteReviewSuccessAction(json, ){
//     if(!json.success){
//         return loadUserInfoFailureAction(json.message)
//     }
//     return {
//         type: deleteReviewFailureAction.LOAD_USER_INFO_SUCCSESS,
//         payload: {
//             user: json.user
//         }
//     }
// }
// function deleteReviewFailureAction(message){
//     return {
//         type: UserSearchActionsConstants.LOAD_USER_INFO_FAIL,
//         message: message
//     }
// }


let UserPageActions  = {
    loadUserInfo,
    loadUserInfoSuccessAction,
    loadUserInfoFailureAction,
    deleteReviewAction
};

export default UserPageActions
