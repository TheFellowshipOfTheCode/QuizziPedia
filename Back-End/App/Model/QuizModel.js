var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    title: String,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    questions:[{
        type: ObjectId,
        ref: 'Question'
    }],
    registeredUsers: [{
        type: ObjectId,
        ref: 'User'
    }],
    activeUsers: [{
        type: ObjectId,
        ref: 'User'
    }],
    correctAnswers: Number
});

module.exports = mongoose.model('Quiz', questionSchema);