
var user = require('../../Model/UserModel');
var summary = require('../../Model/SummaryModel');
var quiz = require('../../Model/QuizModel');
var error = require('../../Model/ErrorModel');


exports.updateDataUser = function(req, res, next) {
    req.user.editUser(req.content,function(err){
        if (err) return res.status(500).json(error.findOne({code:700}));
        return res.send(200);
    })
};

exports.updatePasswordUser = function(req, res, next) {

};

exports.updateStatisticUser = function(req, res) {
    user.updateTopicLevel(req.body.userId, req.body.topic, req.body.difficultyLevel, req.body.isCorrected, function(err) {
        if(err)
            return res.status(500).json({code:733, title: "Errore", message: "Livello utente non aggiornato"});
        user.addTotal(req.body.userId, req.body.topic, function(err) {
            if(err)
                return res.status(500).json({code:734, title: "Errore", message: "Contatore risposte non aggiornato"});
            if (req.body.IsCorrected) {
                user.addCorrect(req.body.userId, req.body.topic, function (err) {
                    if (err)
                        return res.status(500).json({code: 735, title: "Errore",message: "Contatore risposte corrette non aggiornato"});
                    return res.send({code:250, title: "Ok Domanda", message: "Statistiche domande aggiornate correttamente"});
                    })
                }
            })
        })
};

exports.updateSummary = function(req, res, next) {

};

exports.deleteUser = function(req, res, next) {
    req.user.deleteUser(function(err,user){
        if (err)
            return handleError(err)
        else
            return res.send(user)
    })
};


exports.getInfo = function(req, res, next) {
    userId=req.params.userId.replace(':','');
    user.findOne({'_id':userId},'name surname userImg experienceLevel', function(err,info){
        if (err)
            return handleError(err);
        else
            return res.send(info);
    })
};

exports.getSummary= function(req, res, next) {
    summary.findOne({_id:req.param('summaryId')},'quiz givenAnswers data mark', function(summaryJson){
        var quizJson=summary.getQuiz(summaryJson.quiz)
        summaryJson.quizJson=quizJson;
        return res.send(summaryJson);
    })
};

exports.getSummaries = function(req, res, next) {
    req.user.getSummaries(function(error,summaries){
        if(err) return res.status(500).json(err.findOne({code:700}));
        var query=summary.find({'quiz':{$in:summaries.quizSummaries.quiz}});
        var query2=quiz.find({'_id':{$in:query.quiz}});
        var dataSummaries={
            id: query2._id,
            title: query2.title,
            date: query.date
        };
        return res.send(dataSummaries);
    });
};

exports.getUsers = function(req, res, next) {

};

exports.getStatistics = function(req, res, next) {

};