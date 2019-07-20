import { RestPageActionsConstants} from './constants.js';


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



let RestPageActions  = {
    loadRestInfo,
    loadRestInfoSuccessAction,
    loadRestInfoFailureAction
};

export default RestPageActions
