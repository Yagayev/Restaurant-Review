let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let locationsSchema = new Schema({
    locations: [String]
});

module.exports = mongoose.model('Locations', locationsSchema);
