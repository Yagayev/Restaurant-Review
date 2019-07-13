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

let SearchEngineActions  = {
    updateTagAction,
    loadTagsAction,
    loadTagsSuccessAction,
    loadTagsFailureAction,
    //TODO delete the above
    updateNameAction
};

export default SearchEngineActions
