import {getFromStorage} from "./utils/storage";

const { List, Map } = require('immutable');

export default {
    login: Map({
        username: getFromStorage('restorant_review_username') || '',
        password: '',
        token: getFromStorage('restorant_review_token') ||'',
        message: '',
        signupOrLogin: 0,
        coords: '',
        locations: [],
        suggestedLocations: [],
        loc: '',

    }),
    menu: Map({

    }),
    restSearch: Map({
        rests: List(),
        lng: 0,
        lat: 0
    }),
    searchEngine: Map({
        name: '',
        ratings: {
            overall: 0,
            staff_kindness: 0,
            cleaniness: 0,
            drive_thru_quality: 0,
            delivery_speed: 0,
            food_quality: 0,
            taste: 0,
            prices: 0,
            waiting_time: 0
        },
        distanceVsScore: 50,
        advanced: false,
        viewOnMap: false,
        locations: [],
        suggestedLocations: [],
        loc: '',
    }),
    restPage: Map({
        loading: true,
        restId: 0,
        rest: {
            name: '',
            location: '',
            average_ratings: {
                overall: 0,
                staff_kindness: 0,
                cleaniness: 0,
                drive_thru_quality: 0,
                delivery_speed: 0,
                food_quality: 0,
                taste: 0,
                prices: 0,
                waiting_time: 0
            },
            reviews: [],
            description: ''
        }
    }),
    addReview: Map({
        // loading: true,
        submitted: false,
        restName: '',
        description: '',
        ratings: {
            overall: 0,
            staff_kindness: 0,
            cleaniness: 0,
            drive_thru_quality: 0,
            delivery_speed: 0,
            food_quality: 0,
            taste: 0,
            prices: 0,
            waiting_time: 0
        },
    }),
    userPage: Map({
        userViewing: {
            userViewing: '',
            location: '',
            reviews: [],
            hasWritingPermissions: false,
            profile_image: ''
        },
        loading: true,
        new_image: null
    }),
    updateUserDetails: Map({
        newUsername: '',
        // location: '',
        password: '',
        submitted: false,
        message: false,
        coords: '',
        locations: [],
        suggestedLocations: [],
        loc: '',

        // redirect: false
    }),
    submitRest: Map({
        name: '',
        location: '',
        description: '',
        submitted: false,
        coords: {},
        // redirect: ''
    }),
    userSearch: Map({
       searchQuery: '',
        users: List()
    })
};
