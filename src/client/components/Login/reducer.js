import initialState from '../../initialState';
import {LoginActionsConstants} from './constants.js';
import { List } from 'immutable';
import {getFromStorage, setInStorage} from '../../utils/storage';


const AppReducer = (state = initialState.login, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case LoginActionsConstants.UPDATE_TAG:
            return state.set('tag', action.payload.tag);
        case LoginActionsConstants.LOAD_TAGS_SUCCESS:
            let res = action.payload.tags.map(elm => {
                return {label: elm, value: elm }
            });
            return state.set('tags', new List(res));
        case LoginActionsConstants.USERNAME_UPDATE:
            // let ret = state.set('username', action.payload.username);
            // console.log("usernam update: ", ret.toJS());
            return state.set('username', action.payload.username);
        case LoginActionsConstants.PASSWORD_UPDATE:
            return state.set('password', action.payload.password);

        case LoginActionsConstants.SIGNUP_FAILURE:
        case LoginActionsConstants.LOGIN_FAILURE: //same as with signup
            return state.set('message', action.payload.json.message);
        case LoginActionsConstants.SIGNUP_SUCCESS:
            state = state.set('message', action.payload.json.message);
            //nullify username and password:
            state = state.set('username', '');
            state = state.set('password', '');
            return state;
        case LoginActionsConstants.LOGIN_SUCCESS:
            // state = state.set('username', '');
            state = state.set('password', '');
            state = state.set('message', action.payload.json.message);
            state = state.set('token', action.payload.json.token);
            setInStorage('restorant_review_token', action.payload.json.token);
            setInStorage('restorant_review_username', action.payload.json.username);
            return state;
        case LoginActionsConstants.LOAD_USER:
            state = state.set('token', getFromStorage('restorant_review_token'));
            state = state.set('username', getFromStorage('restorant_review_username'));
            return state;
        case LoginActionsConstants.DISCONNECT:
            console.log("DISCONNECT")
            setInStorage('restorant_review_token','');
            setInStorage('restorant_review_username','');
            state = state.set('token','');
            state = state.set('username', '');
            return state;

        case LoginActionsConstants.SET_NEW_USERNAME:
            // let ret = state.set('username', action.payload.username);
            // console.log("usernam update: ", ret.toJS());
            setInStorage('restorant_review_username', action.payload.username);
            return state.set('username', action.payload.username);
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
