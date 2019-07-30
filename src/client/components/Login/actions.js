import { LoginActionsConstants} from './constants.js';


function updateTagAction(tag) {
  return {
    type: LoginActionsConstants.UPDATE_TAG,
    payload: {
      tag
    }
  }
}

function loadTagsAction(){
    return {
        type: LoginActionsConstants.LOAD_TAGS,
        uri: '/api/load/tags'
    }
}

function loadTagsSuccessAction(tags){

    return {
        type: LoginActionsConstants.LOAD_TAGS_SUCCESS,
        payload: {
            tags: tags
        }
    }
}

function loadTagsFailureAction(error){
    return {
        type: LoginActionsConstants.LOAD_TAGS_FAILURE,
        error: error
    }
}

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

function signupEventAction(username, password){
  return {
    type: LoginActionsConstants.SIGNUP,
    uri: '/api/account/signup',
    payload:{
      username: username,
      password: password
    }
  }
}

function loginSuccessAction(json){
    console.log("loginSuccessAction:", json);
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
    console.log("loginFailureAction:", json);

    return {
    type: LoginActionsConstants.LOGIN_FAILURE,
    payload: {
      json: json
    }
  }
}
function signupSuccessAction(json){
    console.log("signupSuccessAction:", json);
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
    console.log("signupFailureAction:", json);

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

function disconnectAction(){
    return {
        type: LoginActionsConstants.DISCONNECT
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

let LoginActions  = {
    updateTagAction,
    loadTagsAction,
    loadTagsSuccessAction,
    loadTagsFailureAction,
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
    setNewUsernameAction
};

export default LoginActions
