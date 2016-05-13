/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::QuizController;
 * Description: classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la gestione dei questionari;
 * Relations with other classes:
 * + IN	QuizRouter;
 * + OUT QuizModel.
 * Creation data: 02-05-2016;
 * Author: Mattia Varotto.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizController_20160502;
 * Update data: 02-05-2016;
 * Description: Creata classe e aggiunti metodi principali;
 * Autore: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

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
    Quiz.getQuiz(req.params.quizId,req.user._id, function(err, quiz) {
        if (err) return res.status(500).json({
            code: 323,
            title: 'Errore Questionario',
            message: err.message
        });
       else 
            res.send(quiz)
            
    })
}

exports.getQuizSubscribers=function (req, res, next) {
    Quiz.getQuizSubscribers(req.params.quizId,function(err, subscribers) {
        if (err) return res.status(500).json({
            code: 323,
            title: 'Errore Questionario',
            message: "Errore Questionario"
        });
        else
            res.send(subscribers)

    })
}

exports.searchQuiz=function(req, res, next) {
    Quiz.searchQuiz(req.params.keyword, function(err, quiz){ console.log(req.params.keyword)
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

exports.getQuizSubscribe=function(req,res,next){
    Quiz.getQuizSubscribe(req.user._id,function(err,quiz) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'Iscrizione Utente Questionario Error',
            message: "Errore ottenimento lista questionari registrati"
        });
        else return res.send(quiz)
    })
}

exports.subscribeUser = function (req, res, next) {
    Quiz.subscribeUser(req.body.quizId, req.user._id, function (err, userId) {
        if (err) return res.status(500).json({
            code: 331,
            title: 'addUser-error',
            message: 'error occurred while adding user'
        });
        else return res.send({
            code: 331,
            title: "Iscrizione Utente Questionario OK",
            message: "L'utente si è registrato correttamente al questionario"
        })
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
    Quiz.addActiveUser(req.body.quizId,req.body.userId, function(err, userId) {
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

