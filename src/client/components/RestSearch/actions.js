import { RestSearchActionsConstants } from './constants';

function setActiveImage(idx) {
  return {
    type: RestSearchActionsConstants.SET_ACTIVE_IMAGE,
    idx: idx
  }
}

function unsetActiveImage(idx){
  return {
    type: RestSearchActionsConstants.UNSET_ACTIVE_IMAGE,
    idx: idx
  }
}

function loadImagesAction(tag) {
  return {
    type: RestSearchActionsConstants.LOAD_IMAGES_ACTION,
    uri: '/api/load/images',
    payload: {
      tag
    }
  }
}



function loadImagesFailureAction(message){
  return {
    type: RestSearchActionsConstants.LOAD_IMAGES_ACTION_FAILURE,
    message
  }
}

function cloneAction(idx) {
  return {
    type: RestSearchActionsConstants.CLONE_ACTION,
    idx: idx
  }
}

function applyFilterAction(idx) {
  return {
    type: RestSearchActionsConstants.APPLY_FILTER_ACTION,
    idx: idx
  }
}

function updateGalleryWidth(width){
  return {
    type: RestSearchActionsConstants.UPDATE_GALLERY_WIDTH,
    payload: {
      width
    }
  }
}
function deleteAction(idx){
  return {
    type: RestSearchActionsConstants.DELETE_ACTION,
    idx: idx
  }
}

//TODO delete all the above
function goToRest(idx){
  return {
    type: RestSearchActionsConstants.GO_TO_REST_ACTION,
    idx: idx,
  }
}

// should actually recieve all params for the request
// probably a good idea to add token and user to the searchEngine
function loadRestsAction(searchCriteria) {
  return {
    type: RestSearchActionsConstants.LOAD_RESTS_ACTION,
    uri: '/api/reviews/findRestaurants',
    payload: {
      searchCriteria
    }
  }
}

function loadRestsSuccessAction(rests){
  return {
    type: RestSearchActionsConstants.LOAD_RESTS_ACTION_SUCCESS,
    payload: {
      rests
    }
  }
}

function loadRestsFailureAction(message) {
  return {
    type: RestSearchActionsConstants.LOAD_RESTS_ACTION_FAILURE,
    message
  }
}


let RestSearchActions = {
  goToRest,
  loadRestsAction,
  loadRestsSuccessAction,
  loadRestsFailureAction
};

export default RestSearchActions

