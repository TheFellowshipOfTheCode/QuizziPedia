
var user = require('../Model/UserModel.js');
var Quiz = require('../Model/QuizModel.js');
var error = require('../Model/ErrorModel.js');

exports.createQuiz = function (req, res) {
    req.body.author=req.user._id;
    Quiz.createQuiz(req.body, function(err,quiz) {
        if (err) return res.status(500).json({
            code: 2,
            title: 'quiz-insertion-error',
            message: 'l\'inserimento del quiz è fallito'
        });
        else return res.send(quiz);
    });
}

exports.getQuiz = function (req, res, next) {
    Quiz.getQuiz(req.params.quizId, function(err, quiz) {
        if (err) return res.status(500).json({
            code: 323,
            title: 'Errore Questionario',
            message: 'Questionario non attivo'
        });
        else return res.send(quiz)
    })
}

exports.searchQuiz=function(req, res, next) {
    Quiz.searchQuiz(req.body.tosearch, function(err, quiz){
        if(err) return res.status(500).json({code:88, title: "Errore Quiz", message: "Nessuna quiz trovato"});
        else return res.send(quiz);
    })
};


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
    Quiz.addUser(req.body._id, function(err, userId) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'addUser-error',
            message: 'error occurred while adding user'
        });
        else return res.send(userId)
    })
}

exports.removeUser = function (req, res, next) {
    Quiz.removeUser(req.body._id, function(err, userId) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'removeUser-error',
            message: 'error occurred while removing user'
        });
        else return res.send(userId)
    })
}

exports.addActiveUser = function (req, res, next) {
    Quiz.addActiveUser(req.body._id, function(err, userId) {
        if (err) return res.status(500).json({
            code: 344,
            title: 'addActiveUser-error',
            message: 'error occurred while adding activeUser'
        });
        else return res.send(userId)
    })
}

exports.updateStatistic = function (req, res, next) {

}

exports.searchQuiz = function (req, res, next) {

}

exports.getPersonalQuizzes = function (req, res, next) {
    console.log(req.body);
    Quiz.getPersonalQuizzes(req.user._id, function(err, personalQuizzes) {
        if (err) return res.status(500).json({
            code: 2,
            title: 'visualizzazione-quiz-fallita',
            message: 'la visualizzazione dei quiz è fallita'
        });
        else {
            console.log(personalQuizzes);
            return res.send(personalQuizzes);
        }
    })

    /*quiz.getQuiz(req.body._id, function(err, quiz) {
     if (err) return res.status(500).json({
     code: 323,
     title: 'quiz-getting-error',
     message: 'byebyebye'
     });
     else return res.send(quiz)
     })*/
}

