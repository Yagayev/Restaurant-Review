let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    url: '',
    public_id: ''
});



module.exports = mongoose.model('Image', imageSchema);
