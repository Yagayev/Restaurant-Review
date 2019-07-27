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

function uploadRequest (file, username, token){
    return {
        type: ActionTypes.UPLOAD_REQUEST,
        uri: '/api/images/profile',
        payload: {
            file: file,
            username: username,
            token: token
        },
    };
}

function uploadProgress (file, progress) {
    return{
        type: ActionTypes.UPLOAD_PROGRESS,
        payload: progress,
        meta: { file },
    }
}
function uploadSuccess (file){
    return {
        type: ActionTypes.UPLOAD_SUCCESS,
        meta: { file }
    }
};
function uploadFailure (file, err) {
    return {
        type: ActionTypes.UPLOAD_FAILURE,
        payload: err,
        error: true,
        meta: { file },
    }
}


let UserPageActions  = {
    loadUserInfo,
    loadUserInfoSuccessAction,
    loadUserInfoFailureAction,
    deleteReviewAction,
    uploadRequest,
    uploadProgress,
    uploadSuccess,
    uploadFailure
};

export default UserPageActions
