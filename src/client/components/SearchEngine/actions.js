import { SearchEngineActionsConstants} from './constants.js';



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

function loadLocationsAction() {
    return {
        type: SearchEngineActionsConstants.LOAD_LOCATIONS,
        uri: '/api/reviews/locations'
    }
}
function loadLocationsCompleteAction(locations) {
    return {
        type: SearchEngineActionsConstants.COMPLETE_LOAD_LOCATIONS,
        payload:{
            locations: locations
        }
    }
}

function updateSuggestionAction(locations) {
    return {
        type: SearchEngineActionsConstants.UPDATE_SUGGESTION,
        payload:{
            locations: locations
        }

    }
}

function updateLocAction(location) {
    return {
        type: SearchEngineActionsConstants.UPDATE_LOC,
        payload:{
            location: location
        }

    }
}

let SearchEngineActions  = {

    updateNameAction,
    advancedOpenAction,
    advancedCloseAction,
    updateRatingAction,
    updateDistanceVsScoreAction,
    viewMapSetAction,
    viewMapUnsetAction,
    loadLocationsAction,
    loadLocationsCompleteAction,
    updateSuggestionAction,
    updateLocAction
};

export default SearchEngineActions
