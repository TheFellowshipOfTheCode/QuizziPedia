var mongoose = require('mongoose');
var Question = require('./QuestionModel');

var quizSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    activeUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    correctAnswers: Number
});

quizSchema.statics.getQuiz=function(quizId,callback){
    return this.findOne({'_id':quizId},'title questions',function (err, quiz){
        Question.getQuestion(quiz.questions, callback)
    })
};

module.exports = mongoose.model('Quiz', quizSchema);

