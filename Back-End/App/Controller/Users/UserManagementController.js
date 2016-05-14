/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::UserManagementController;
 * Description: classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la modifica dei dati dell’utente. Rappresenta il
 * ConcreteHandler del design pattern Chain of responsibility. Utilizza
 * Passport;
 * Creation data: 01-05-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160501;
 * Update data: 01-05-2016;
 * Description: Creata classe;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160503;
 * Update data: 08-05-2016;
 * Description: Aggiunta la funzione updateStatisticUser;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var topic = require('../../Model/TopicModel');
var user = require('../../Model/UserModel');
var Summary = require('../../Model/SummaryModel');
var quiz = require('../../Model/QuizModel');
var error = require('../../Model/ErrorModel');


exports.searchUser=function(req, res) {
    user.getUsers(req.params.keyword, function(err, users){
        if(err) return res.status(500).json({code:88, title: "Errore Utente", message: "Nessuna utente trovato"});
        else return res.send(users);
    })
};

exports.updateDataUser = function(req, res, next) {
    req.user.editUser(req.content,function(err){
        if (err) return res.status(500).json(error.findOne({code:700}));
        return res.send(200);
    })
};

exports.updatePasswordUser = function(req, res, next) {

};

exports.updateStatisticUser = function(req, res) {
    if(req.body.userId) {
        user.updateTopicLevel(req.body.userId, req.body.userLevel, req.body.topic, req.body.difficultyLevel, req.body.isCorrected, function (err, userLevel) {
            if (err)
                return res.status(500).json({code: 733, title: "Errore", message: "Livello utente non aggiornato"});
            user.addTotal(req.body.userId, req.body.topic, function (err) {
                if (err)
                    return res.status(500).json({
                        code: 734,
                        title: "Errore",
                        message: "Contatore risposte non aggiornato"
                    });
                if (req.body.isCorrected) {
                    user.addCorrect(req.body.userId, req.body.topic, function (err) {
                        if (err)
                            return res.status(500).json({
                                code: 735,
                                title: "Errore",
                                message: "Contatore risposte corrette non aggiornato"
                            });
                        userLevel.statistics.forEach(function(stat){
                            if(stat.topicName==req.body.topic)
                                res.send({userLevel: stat.topicLevel});
                        });
                    })
                }
                else {
                    userLevel.statistics.forEach(function(stat){
                        if(stat.topicName==req.body.topic)
                            res.send({userLevel: stat.topicLevel});
                    });
                }
            })
        })
    }
    else {
        var level = user.updateTopicLevel(req.body.userId, req.body.userLevel, req.body.topic, req.body.difficultyLevel, req.body.isCorrected);
        return res.send({userLevel: level});
    }
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
        /*if (err) return res.status(522).json({
            code: 2,
            title: 'visualizzazione-quiz-fallita',
            message: 'la visualizzazione dei quiz è fallita'
        });*/
        if (err)
            return err;
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