var mongoose = require('mongoose');
var errorSchema = new mongoose.Schema({
    errorCode: Number,
    errorMessage: String,
    errorTitle : String
});

module.exports = mongoose.model('Error', errorSchema);