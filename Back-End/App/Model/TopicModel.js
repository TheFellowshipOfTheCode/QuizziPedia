var mongoose = require('mongoose');
var topicSchema = new mongoose.Schema({
    name: String,
    correctAnswers: Number,
    totalAnswers: Number,
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }]
});

module.exports = mongoose.model('Topic', topicSchema);