const { List, Map } = require('immutable');

export default {
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    login: Map({
        username: '',
        password: '',
        token: '',
        message: ''
    }),
    app: Map({
        size: 200,
        tag: 'art',
        tags: List()
    }),
    menu: Map({

    }),
    restSearch: Map({
        rests: List()
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
        distanceVsScore: 0,
        advanced: false
    }),
    restreview: Map({

    }),
    userpage: Map({

    })
};
