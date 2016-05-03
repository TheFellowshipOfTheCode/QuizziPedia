
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

exports.getQuiz = function (req, res, next) {
    /*quiz.getQuiz(req.body._id, function(err, quiz) {
        if (err) return res.status(500).json({
            code: 323,
            title: 'quiz-getting-error',
            message: 'byebyebye'
        });
        else return res.send(quiz)
    })*/
}


exports.editQuiz = function (req, res, next) {
    /*quiz.editQuiz(req.body, function(err, quiz) {
        if (err) return res.status(500).json({
            code: 322,
            title: 'quiz-editing-error',
            message: 'byebye'
        });
        else return res.send(quiz);
    })*/
}

exports.addUser = function (req, res, next) {
    quiz.addUser(req.body._id, function(err, user) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'addUser-error',
            message: 'error occurred while adding user'
        });
        else return res.send(user)
    })
}

exports.removeUser = function (req, res, next) {
    quiz.removeUser(req.body._id, function(err, user) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'removeUser-error',
            message: 'error occurred while removing user'
        });
        else return res.send(user)
    })
}

exports.addActiveUser = function (req, res, next) {

}

exports.updateStatistic = function (req, res, next) {

}

exports.searchQuiz = function (req, res, next) {

}

exports.getPersonalQuizzes = function (req, res, next) {

}

