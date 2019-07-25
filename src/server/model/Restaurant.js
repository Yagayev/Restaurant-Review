let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },

    review_count: {
        type: Number,
        default: 0
    },
    lat: {
        type: Number,
        default: 0
    },
    lon: {
        type: Number,
        default: 0
    },

    average_ratings: {
        overall: {
            type: Number,
            default: 0
        },
        staff_kindness: {
            type: Number,
            default: 0
        },
        cleaniness: {
            type: Number,
            default: 0
        },
        drive_thru_quality: {
            type: Number,
            default: 0
        },
        delivery_speed: {
            type: Number,
            default: 0
        },
        food_quality: {
            type: Number,
            default: 0
        },
        taste: {
            type: Number,
            default: 0
        },
        prices: {
            type: Number,
            default: 0
        },
        waiting_time: {
            type: Number,
            default: 0
        }
    },
    // reviews: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review'
    // }],
});

module.exports = mongoose.model('Rstaurant', restaurantSchema);

