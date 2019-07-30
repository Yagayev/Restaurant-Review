import { SearchEngineActionsConstants} from './constants.js';


function updateTagAction(tag) {
  return {
    type: SearchEngineActionsConstants.UPDATE_TAG,
    payload: {
      tag
    }
  }
}

function loadTagsAction(){
    return {
        type: SearchEngineActionsConstants.LOAD_TAGS,
        uri: '/api/load/tags'
    }
}

function loadTagsSuccessAction(tags){
    return {
        type: SearchEngineActionsConstants.LOAD_TAGS_SUCCESS,
        payload: {
            tags: tags
        }
    }
}

function loadTagsFailureAction(error){
    return {
        type: SearchEngineActionsConstants.LOAD_TAGS_FAILURE,
        error: error
    }
}

function updateNameAction(name){
    return {
        type: SearchEngineActionsConstants.UPDATE_NAME,
        payload: {
            name
        }
    }
}

function advancedOpenAction(){
    return {
        type: SearchEngineActionsConstants.ADVANCED_OPEN
    }
}

function advancedCloseAction(){
    return {
        type: SearchEngineActionsConstants.ADVANCED_CLOSE
    }
}

function updateRatingAction(key, rating){
    return {
        type: SearchEngineActionsConstants.UPDATE_RATING,
        payload: {
            key,
            rating
        }
    }
}

function updateDistanceVsScoreAction(val){
    return {
        type: SearchEngineActionsConstants.UPDATE_CLOSER_BETTER,
        payload:{
            distanceVsScore: val
        }
    }
}

function viewMapSetAction(){
    return {
        type: SearchEngineActionsConstants.VIEW_MAP_SET
    }
}

function viewMapUnsetAction(){
    return {
        type: SearchEngineActionsConstants.VIEW_MAP_UNSET
    }
}


let SearchEngineActions  = {
    updateTagAction,
    loadTagsAction,
    loadTagsSuccessAction,
    loadTagsFailureAction,
    //TODO delete the above
    updateNameAction,
    advancedOpenAction,
    advancedCloseAction,
    updateRatingAction,
    updateDistanceVsScoreAction,
    viewMapSetAction,
    viewMapUnsetAction
};

export default SearchEngineActions
