import { AddReviewActionsConstants} from './constants.js';





function updateDescriptionAction(description){
    return {
        type: AddReviewActionsConstants.UPDATE_DESCRIPTION,
        payload: {
            description: description
        }
    }
}

function updateRatingAction(key, rating){
    return {
        type: AddReviewActionsConstants.UPDATE_RATING,
        payload: {
            key,
            rating
        }
    }
}

function loadRestAction(id) {
    return {
        type: AddReviewActionsConstants.LOAD_REST,
        uri: '/api/reviews/viewRestaurant',
        payload: {
            restId: id
        }
    }
}

function loadRestSuccessAction(json){
    if(!json.success){
        return loadRestFailureAction(json.message)
    }
    return {
        type: AddReviewActionsConstants.LOAD_REST_SUCCESS,
        payload: {
            rest: json.rest
        }
    }
}
function loadRestFailureAction(message){
    return {
        type: AddReviewActionsConstants.LOAD_REST_FAIL,
        message: message
    }
}


function submitReviewAction(review){
    return {
        type: AddReviewActionsConstants.SUBMIT_REVIEW,
        uri: '/api/reviews/uploadReview',
        payload: {
            review: review
        }
    }
}

function submitReviewSuccessAction(json){
    if(!json.success){
        return submitReviewFailureAction(json.message);
    }
    return{
        type: AddReviewActionsConstants.SUBMIT_REVIEW_SUCCESS
    }
}
function submitReviewFailureAction(msg){
    return{
        type: AddReviewActionsConstants.SUBMIT_REVIEW_SUCCESS,
        message: msg
    }
}


let AddReviewActions  = {
    updateDescriptionAction,
    updateRatingAction,
    loadRestAction,
    loadRestSuccessAction,
    loadRestFailureAction,
    submitReviewAction,
    submitReviewSuccessAction,
    submitReviewFailureAction
    
};

export default AddReviewActions
