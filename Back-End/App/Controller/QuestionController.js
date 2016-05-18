/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::QuestionController;
 * Description: classe che gestisce la logica applicativa riguardante la
 * visualizzazione, la creazione e la modifica delle domande presenti
 * nell’applicazione;
 * Creation data: 02-05-2016;
 * Author: Marco Prelaz.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionController_20160502;
 * Update data: 02-05-2016;
 * Description: Creata classe;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: QuestionController_20160510;
 * Update data: 03-05-2016;
 * Description: Creati metodi: createQuestion(), uploadImage(), getQuestion();
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: QuestionController_20160510;
 * Update data: 04-05-2016;
 * Description: Creati metodi: getQuestions(), editQuestion(), updatestatisticsQuestion();
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: QuestionController_20160510;
 * Update data: 05-05-2016;
 * Description: Creati metodi: getAllQuestions(), getTopic();
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
var Question = require('../Model/QuestionModel');
var Topic= require('../Model/TopicModel');

exports.createQuestion = function(req, res) {
    console.log(req.body)
    Question.createQuestion(req.user._id, req.body, function(err, question){
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "Domanda non creata"});
        else {
            Topic.findOne({'name':req.body.topic}, function(err,topic){
                if(err)
                    return next(err);
                topic.question.push(question._id);
                topic.save();
                return res.send({code:90, title: "Ok Domanda", message: "Domanda creata correttamente"});
            });
        }
    })
};

exports.uploadImage=function(req, res, next) {
        res.json({message:"ok"});
};


exports.getQuestion = function(req, res) {
    Question.getQuestion(req.param("questionId"), function(err, question){
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "Nessuna domanda trovata con l'id passato"});
        else return res.send(question);
    })
};

exports.getQuestions = function(req, res) {
    Question.getQuestions(req.user._id, function(err, questions){
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "La lista delle domande create dall'utente è vuota"});
        else return res.send(questions);
    })
};

exports.editQuestion = function(req, res) {
    Question.editQuestion(req.body, function(err, question){
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "Domanda non modificata"});
        else return res.send({code:88, title: "Errore Domanda", message: "Domanda modificata correttamente"});
    })
};

exports.updatestatisticsQuestion = function(req, res) {
    Question.updateLevel(req.body.questionId,req.body.userLevel,req.body.isCorrected, function(err, cb){
        if(err) return res.status(500).json({code:133, title: "Errore Domanda", message: "Livello domanda non aggiornato"});
        Question.addTotal(req.body.questionId, function(err){
            if(err)
                return res.status(500).json({code:133, title: "Errore Domanda", message: "Contatore risposte non aggiornato"});
            if (req.body.IsCorrected) {
                Question.addCorrect(req.body.questionId, function (err) {
                    if (err)
                        return res.status(500).json({code: 133, title: "Errore Domanda",message: "Contatore risposte corrette non aggiornato"});
                    return res.send({code:100, title: "Ok Domanda", message: "Statistiche domande aggiornate correttamente"});
                })
            }
            else
                return res.send({code:100, title: "Ok Domanda", message: "Statistiche domande aggiornate correttamente"});
            
        })
    })
}

