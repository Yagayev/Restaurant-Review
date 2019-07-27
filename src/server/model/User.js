let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    lat: {
        type: Number,
        default: 0
    },
    lon: {
        type: Number,
        default: 0
    },
    profile_image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

userSchema.methods.generateHash = function(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
}
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
