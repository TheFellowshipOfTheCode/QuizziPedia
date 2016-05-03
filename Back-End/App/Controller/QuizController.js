
var user = require('../Model/UserModel.js');
var quiz = require('../Model/QuizModel.js');
var error = require('../Model/ErrorModel.js');

exports.createQuiz = function (req, res) {
    quiz.createQuiz(req.body, function(err, quiz) {
        if (err) return res.status(500).json({ code: 321,
            title: 'quiz-insertion-error',
            message: 'ciaociao' });
        else return res.send(quiz) // usare send o json??
    })
}




exports.editQuiz = function (req, res, next) {
    var quizUpdated = {
        title: req.title,
        author: req.author,
        questions: req.questions,
        registeredUsers: req.registeredUsers,
        activeUsers: req.activeUsers,
        correctAnswers: req.correctAnswers
    }
    quizSchema.update({ _id: req.params._id }, quizUpdated, function(err) {
        if (err) {
            return handleError(err);
        }
        else {
            return res.send(quizUpdated)
        }
    })

}

exports.addUser = function (req, res, next) {

}

exports.removeUser = function (req, res, next) {

}

exports.addActiveUser = function (req, res, next) {

}

exports.updateStatistic = function (req, res, next) {

}

exports.searchQuiz = function (req, res, next) {

}

exports.getPersonalQuizzes = function (req, res, next) {

}

exports.getQuiz = function (req, res, next) {

}