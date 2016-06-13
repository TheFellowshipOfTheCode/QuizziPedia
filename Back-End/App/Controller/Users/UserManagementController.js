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
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: UserManagementController_20160526;
* Update data: 26-05-2016;
* Description: Creata le funzioni: updatePasswordUser(), changeUserType() e
* aggiornata la funzione updateStatisticUser();
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: UserManagementController_20160525;
* Update data: 25-05-2016;
* Description: Creata le funzioni: updateDataUser(), deleteUser(), getInfo();
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: UserManagementController_20160505;
* Update data: 05-05-2016;
* Description: Create le funzioni: getSummaries(), getUser(), getStatistics();
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: UserManagementController_20160503;
* Update data: 03-05-2016;
* Description: Create le funzioni: updateStatisticsUser(), getSummary();
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: UserManagementController_20160501;
* Update data: 01-05-2016;
* Description: Creata classe e la funzione searchUser();
* Autore: Franco Berton.
*-------------------------------------------------------------------------------
*******************************************************************************/

var user = require('../../Model/UserModel');
var summary = require('../../Model/SummaryModel');
var quiz = require('../../Model/QuizModel');
var error = require('../../Model/ErrorModel');
var fs=require("fs")

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'Front-End/Images/Members'); // Le immagini verranno uploadate qui
    },
    filename: function (req, file, callback) {
        if (req.user.userImg != 'Images/Members/user-default.png') {
          fs.readdir(process.cwd(), function (err, file) {
            if (err) {
            }
            else {
            }
          });
        }
        callback(null, req.user._id + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]); // Vogliamo che l'immagine salvata mantenga il nome originale
    }
});

var upload =multer({storage: storage}).single('file');


exports.searchUser=function(req, res) {
    user.getUsers(req.params.keyword, function(err, users){
        if(err) return res.status(500).json({code:88, title: "Errore Utente", message: "Nessuna utente trovato"});
        else return res.send(users);
    })
};

exports.updateDataUser = function(req, res, next) {
    upload(req,res,function(err) {
        var image;
        if (req.file!=undefined)
            image="Images/Members/"+req.file.filename;
        else
            image="Images/Members/user-default.png"
        req.user.editUser(req.body.name, req.body.surname, req.body.email,image, function (err) {
            if (err)
                return res.status(500).json({
                    code: 814,
                    title: "Errore",
                    message: "Dati utente non aggiornati"
                });
            else
                return res.send({
                    code: 222,
                    title: "Ok",
                    message: "Dati utente aggiornati correttamente"
                });
        })
    })
};

exports.updatePasswordUser = function(req, res, next) {
    req.user.editPassword(req.body.password, function(err){
        if (err)
            return res.status(500).json({
                code: 746,
                title: "Errore",
                message: "Password non aggiornata"
            });
        else
            return res.send({
                code: 313,
                title: "Ok",
                message: "Password aggiornata correttamente"
            });
    })
};

exports.getInfoUserSearched=function(req, res, next) {
    user.getInfoUserSearched(req.params.username,function(err,user){
        if (err)
            return res.status(500).json({
                code: 746,
                title: "Errore",
                message: "Utente non trovato"
            });
        else
            return res.send({user:user})
    })
}

exports.updateStatisticUser = function(req, res) {
    if(req.body.userId) {
        user.updateTopicLevel(req.body.userId, req.body.userLevel, req.body.topic, req.body.difficultyLevel, req.body.isCorrected, function (err, userLevel) {
            if (err)
                return res.status(500).json({code: 733, title: "Errore", message: "Livello utente non aggiornato"});
            user.upLevel(req.body.userId, req.body.isCorrected, function(err){
                if (err)
                    return res.status(500).json({
                        code: 899,
                        title: "Errore",
                        message: "Experience level non aggiornato"
                    });
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
        })
    }
    else {
        var level = user.updateTopicLevel(req.body.userId, req.body.userLevel, req.body.topic, req.body.difficultyLevel, req.body.isCorrected);
        return res.send({userLevel: level});
    }
};

exports.deleteUser = function(req, res, next) {
    req.user.deleteUser(function(err){
        if (err)
            return res.status(500).json({
                code: 555,
                title: "Errore",
                message: "Utente non eliminato"
            });
        else
            return res.send({
                code: 222,
                title: "Ok",
                message: "Utente eliminato"
            });
    })
};


exports.getInfo = function(req, res, next) {
    user.findOne({'_id':req.user._id},'name surname email privilege userImg experienceLevel', function(err,info){
        if (err)
            return res.status(500).json({
                code: 412,
                title: "Errore",
                message: "Info utente non trovate"
            });
        else
            return res.send(info);
    })
};

exports.getSummary= function(req, res, next) {
    summary.findOne({_id:req.params.summaryId},'quiz givenAnswers data mark', function(summaryJson){
        var quizJson=summary.getQuiz(summaryJson.quiz)
        summaryJson.quizJson=quizJson;
        return res.send(summaryJson);
    })
};

exports.getSummaries = function(req, res, next) {
req.req.user.getSummaries(function(error,summaries){
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

exports.changeUserType = function(req, res, next) {
    req.user.editType(function(err){
        if (err)
            return res.status(500).json({
                code: 625,
                title: "Errore",
                message: "Cambio tipo non effettuato"
            });
        else
            return res.send({
                code: 646,
                title: "Ok",
                message: "Cambio tipo effettuato correttamente"
            });
    })
};
