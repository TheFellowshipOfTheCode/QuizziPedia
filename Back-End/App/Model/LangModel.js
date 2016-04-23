var mongoose = require('mongoose');
var langSchema = new mongoose.Schema({
    lang: String,
    variables: [String]
});

module.exports = mongoose.model('Lang', langSchema);