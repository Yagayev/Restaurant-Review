import { UpdateUserDetailsActionsConstants} from './constants.js';
import {strToLonAndLat} from '../../utils/geo';


function updateNewUsernameAction (username){
    return{
        type: UpdateUserDetailsActionsConstants.UPDATE_NEW_USERNAME,
        payload:{
            newUsername: username
        }
    }
}
function updateNewLocationAction (location){
    return{
        type: UpdateUserDetailsActionsConstants.UPDATE_NEW_LOCATION,
        payload:{
            location: location
        }
    }
}

function updatePasswordAction (password){
  return{
    type: UpdateUserDetailsActionsConstants.UPDATE_NEW_PASSWORD,
    payload:{
      password: password
    }
  }
}

function updateCoordsAction (coords){
    return{
        type: UpdateUserDetailsActionsConstants.UPDATE_USER_COORDS,
        payload:{
            coords: coords
        }
    }
}



function submitDetailsEventAction(username, token, newUsername, location, coords, password){
    var updates = {};
    if(newUsername && newUsername !== ''){
        updates.username = newUsername;
    }
    if(location && location !== ''){
        updates.location = location;
    }
    if(password && password !== ''){
        updates.password = password;
    }
    if(coords.lng && coords.lat){
        updates.lon = coords.lng;
        updates.lat = coords.lat;
    }
  return {
    type: UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS,
    uri: '/api/account/updateDetails',
    payload:{
      username: username,
      token: token,
      updates: updates
    }
  }
}


function updateUserDetailsSuccessAction(json){
    if(!json.success){
        return updateUserDetailsFailureAction(json.error);
    }

  return {
    type: UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS_SUCCESS,
    payload: {
      json: json
    }
  }
}
function updateUserDetailsFailureAction(error){
    return {
    type: UpdateUserDetailsActionsConstants.SUBMIT_NEW_DETAILS_FAIL,
    error: error
  }
}

let UpdateUserDetailsActions  = {
    updateNewUsernameAction,
    updateNewLocationAction,
    updatePasswordAction,
    updateCoordsAction,
    submitDetailsEventAction,
    updateUserDetailsSuccessAction,
    updateUserDetailsFailureAction
};

export default UpdateUserDetailsActions
