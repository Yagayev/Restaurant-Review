let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }

});



module.exports = mongoose.model('UserSession', userSessionSchema);
