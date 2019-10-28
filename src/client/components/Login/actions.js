import { LoginActionsConstants} from './constants.js';


function updateUsernameAction (username){
    return{
        type: LoginActionsConstants.USERNAME_UPDATE,
        payload:{
            username: username
        }
    }
}

function updatePasswordAction (password){
  return{
    type: LoginActionsConstants.PASSWORD_UPDATE,
    payload:{
      password: password
    }
  }
}

function loginEventAction(username, password){
  return {
    type: LoginActionsConstants.LOGIN,
    uri: '/api/account/login',
    payload:{
      username: username,
      password: password
    }
  }
}

function signupEventAction(username, password, location, lat, lon){
  return {
    type: LoginActionsConstants.SIGNUP,
    uri: '/api/account/signup',
    payload:{
        username: username,
        password: password,
        location: location,
        lat: lat,
        lon: lon
    }
  }
}

function loginSuccessAction(json){
    // console.log("loginSuccessAction:", json);
    if(!json.success){
        return loginFailureAction(json);
    }

  return {
    type: LoginActionsConstants.LOGIN_SUCCESS,
    payload: {
      json: json
    }
  }
}
function loginFailureAction(json){
    // console.log("loginFailureAction:", json);

    return {
    type: LoginActionsConstants.LOGIN_FAILURE,
    payload: {
      json: json
    }
  }
}
function signupSuccessAction(json){
    // console.log("signupSuccessAction:", json);
    if(!json.success){
        return signupFailureAction(json);
    }
  return {
    type: LoginActionsConstants.SIGNUP_SUCCESS,
    payload: {
      json: json
    }
  }
}
function signupFailureAction(json){
    // console.log("signupFailureAction:", json);

    return {
    type: LoginActionsConstants.SIGNUP_FAILURE,
    payload: {
      json: json
    }
  }
}

function loadUserAction(){
    return {
        type: LoginActionsConstants.LOAD_USER
    }
}

function disconnectAction(username, token){
    return {
        type: LoginActionsConstants.DISCONNECT,
        uri: '/api/account/logout',
        payload: {
            username: username,
            token: token
        }
    };
}

function setNewUsernameAction (username){
    return{
        type: LoginActionsConstants.SET_NEW_USERNAME,
        payload:{
            username: username
        }
    }
}



function loadLocationsAction() {
    return {
        type: LoginActionsConstants.LOAD_LOCATIONS,
        uri: '/api/reviews/locations'
    }
}
function loadLocationsCompleteAction(locations) {
    return {
        type: LoginActionsConstants.COMPLETE_LOAD_LOCATIONS,
        payload:{
            locations: locations
        }
    }
}

function updateSuggestionAction(locations) {
    return {
        type: LoginActionsConstants.UPDATE_SUGGESTION,
        payload:{
            locations: locations
        }

    }
}

function updateLocAction(location) {
    return {
        type: LoginActionsConstants.UPDATE_LOC,
        payload:{
            location: location
        }

    }
}

function updateCoordsAction (coords){
    return{
        type: LoginActionsConstants.UPDATE_USER_COORDS,
        payload:{
            coords: coords
        }
    }
}

function setLoginSignup(index){
    return {
        type: LoginActionsConstants.SET_SIGNUP_LOGIN,
        index: index
    }
}

let LoginActions  = {


    updateUsernameAction,
    updatePasswordAction,
    loginEventAction,
    signupEventAction,
    loginSuccessAction,
    loginFailureAction,
    signupSuccessAction,
    signupFailureAction,
    loadUserAction,
    disconnectAction,
    setNewUsernameAction,

    updateCoordsAction,
    loadLocationsAction,
    loadLocationsCompleteAction,
    updateSuggestionAction,
    updateLocAction,
    setLoginSignup
};

export default LoginActions
