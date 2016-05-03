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



quizSchema.statics.createQuiz = function(info, callback) {
    Quiz.save({ title: info.title, correctAnswers: info.correctAnswers });
}


quizSchema.methods.getQuiz=function(quizId){
    var quizJson={};
    quizJson.quiz=Quiz.findOne({'_id':quizId});
    Question.getQuestion(quizJson.quiz.questions,function(err,questions){
        if (err) return handleError(err);
        quizJson.questions=questions;
        return quizJson;
    });

}

var Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

