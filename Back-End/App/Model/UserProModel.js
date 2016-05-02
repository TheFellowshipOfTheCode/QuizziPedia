var mongoose = require('mongoose');
var userProSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

module.exports = mongoose.model('UserPro', userProSchema);