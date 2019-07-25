import { SubmitRestActionsConstants} from './constants.js';
import {strToLonAndLat} from '../../utils/geo';

function updateNameAction (name){
    return{
        type: SubmitRestActionsConstants.UPDATE_REST_NAME,
        payload:{
            name: name
        }
    }
}

function updateNewLocationAction (location){
    return{
        type: SubmitRestActionsConstants.UPDATE_REST_LOCATION,
        payload:{
            location: location
        }
    }
}

function updateDescriptionAction (description){
  return{
    type: SubmitRestActionsConstants.UPDATE_REST_DESCRIPTION,
    payload:{
        description: description
    }
  }
}



function submitRestAction(username, token, name, location, coords, description){
    let lonAndLen = strToLonAndLat(coords);
  return {
    type: SubmitRestActionsConstants.SUBMIT_NEW_REST,
    uri: '/api/reviews/newRestaurant',
    payload:{
      username: username,
      token: token,
        name: name,
        location: location,
        lon: lonAndLen[0],
        lat: lonAndLen[1],
        description: description
    }
  }
}


function submitRestSuccessAction(json){
    if(!json.success){
        return submitRestFailureAction(json.error);
    }

  return {
    type: SubmitRestActionsConstants.SUBMIT_NEW_REST_SUCCESS,
    payload: {
      json: json
    }
  }
}
function submitRestFailureAction(error){
    return {
    type: SubmitRestActionsConstants.SUBMIT_NEW_REST_FAIL,
    error: error
  }
}

function updateCoordsAction(coords){
    return {
        type: SubmitRestActionsConstants.UPDATE_REST_COORDS,
        payload: {
            coords: coords
        }
    }
}


let SubmitRestActions  = {
    updateNameAction,
    updateNewLocationAction,
    updateDescriptionAction,
    submitRestAction,
    submitRestSuccessAction,
    submitRestFailureAction,
    updateCoordsAction
};

export default SubmitRestActions
