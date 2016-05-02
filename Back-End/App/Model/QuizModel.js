var mongoose = require('mongoose');
var Question = require('./QuestionModel')

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

quizSchema.methods.getQuiz=function(quizId){
    var quizJson={};
    quizJson.quiz=Quiz.findOne({'_id':quizId});
    Question.getQuestion(quizJson.quiz.questions,function(err,questions){
        if (err) return handleError(err);
        quizJson.questions=questions;
        return quizJson;
    });

}

module.exports = mongoose.model('Quiz', quizSchema);

