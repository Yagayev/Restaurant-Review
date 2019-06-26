let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rstaurant'
    },

    ratings: {
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

    description: {
        type: String,
        default: ''
    },


});

module.exports = mongoose.model('Review', reviewSchema);

