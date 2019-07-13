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
        username: 'tapuz',
        password: '',
        token: '5d11769317381d2fe057f051',
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
        ratings: List(),
        distanceVsScore: 0

    }),
    restreview: Map({

    }),
    userpage: Map({

    })
};
