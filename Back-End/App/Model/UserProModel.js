var mongoose = require('mongoose');
var userProSchema = new mongoose.Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

module.exports = mongoose.model('UserPro', userProSchema);