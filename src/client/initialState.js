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
    menu: map({

    }),
    restsearch: map({
        rests: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    restreview: map({

    }),
    userpage: map({

    })
};
