import { RestPageActionsConstants} from './constants.js';
import {UserPageActionsConstants} from "../UserPage/constants";


function loadRestInfo(id) {
    return {
        type: RestPageActionsConstants.LOAD_REST_INFO,
        uri: '/api/reviews/viewRestaurant',
        payload: {
            restId: id
        }
    }
}

function loadRestInfoSuccessAction(json){
    if(!json.success){
        return loadRestInfoFailureAction(json.message)
    }
    return {
        type: RestPageActionsConstants.LOAD_REST_INFO_SUCCSESS,
        payload: {
            rest: json.rest
        }
    }
}
function loadRestInfoFailureAction(message){
    return {
        type: RestPageActionsConstants.LOAD_REST_INFO_FAIL,
        message: message
    }
}


function deleteReviewAction(token, username, reviewid, restid){
    return {
        type: RestPageActionsConstants.DELETE_REST_REVIEW,
        uri: '/api/reviews/deleteReview',
        payload:{
            token,
            username,
            reviewid,
            restid
        }
    }
}


let RestPageActions  = {
    loadRestInfo,
    loadRestInfoSuccessAction,
    loadRestInfoFailureAction,
    deleteReviewAction,
};

export default RestPageActions
