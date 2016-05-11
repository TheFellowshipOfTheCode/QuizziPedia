/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::TopicController;
 * Description: classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la modifica degli argomenti delle domande;
 * Relations with other classes:
 * + IN	QuestionRouter;
 * + OUT TopicModel.
 * Creation data: 02-05-2016;
 * Author: Marco Prelaz.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicController_20160502;
 * Update data: 02-05-2016;
 * Description: Creata classe;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
var Topic = require('../Model/TopicModel');

var count = 0;

exports.getNextQuestion = function(req, res) {
    if(!req.body.topic){
        return res.status(500).json({code:741, title: "getNextQuestionError", message: "Nessun argomento inserito"});
    }
    else {
        Topic.findTopicByName(req.body.topic, function(err,topic){
            if (err)
                return res.status(500).json({code:721, title: "getNextQuestionError", message: "error"});
            else
                Topic.getNextQuestion(topic, req.body.alreadyAnswered, req.body.language, req.body.keywords, req.body.level, function(err,question){
                    if (err)
                        return res.status(500).json({code:766, title: "getNextQuestionError", message: "error"});
                    else {
                        var equalKeywords = 0;
                        if (question) {
                            question.keywords.forEach(function (k1) {
                                req.body.keywords.forEach(function (k2) {
                                    if (k1 == k2) {
                                        equalKeywords++;
                                    }
                                });
                            });
                            if (req.body.keywords.length==equalKeywords || req.body.keywords.length==0) {
                                console.log(count);
                                count = 0;
                                return res.send(question);
                            }
                        }
                        if(!question || req.body.keywords.length!=equalKeywords) {
                            if (req.body.alreadyAnswered.length == topic.question.length)
                                return res.status(500).json({
                                    code: 845,
                                    title: "Allenamento finito",
                                    message: "Non ci sono più domande sull'argomento scelto per questo allenamento"
                                });
                            else if (count < 15) {
                                count++;
                                module.exports.getNextQuestion(req, res);
                            }
                            else {
                                req.body.keywords = [];
                                module.exports.getNextQuestion(req, res);
                            }
                        }
                    }
                })
        })
    }
};

exports.getTopics = function(req, res) {
    Topic.getTopics(function(err,topics){
        if(err)
            return res.status(500).json({code:757, title: "getTopics", message: "error"});
        else
            return res.send(topics);
    })
};

exports.getKeywords = function(req, res) {
    Topic.findTopicByName(req.body.topic, function(err,topic){
        if (err)
            return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
        else
            Topic.getQuestions(topic, function(err,questions){
                if (err)
                    return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
                else {
                    var arrayKeywords=[];
                    questions.forEach(function(question){
                        arrayKeywords=arrayUnique(arrayKeywords.concat(question.keywords));
                    });
                    return res.json(arrayKeywords);
                }
            })
    })
};

exports.updateStatisticTopic = function(req, res) {
    Topic.addTotal(req.body.topic, function(err){
        if (err)
            return res.status(500).json({
                code: 711,
                title: "Errore",
                message: "Contatore risposte corrette non aggiornato"
            });
        if(req.body.isCorrected) {
            Topic.addCorrect(req.body.topic, function (err) {
                if (err)
                    return res.status(500).json({
                        code: 722,
                        title: "Errore",
                        message: "Contatore risposte corrette non aggiornato"
                    });
                return res.send({code:100, title: "Ok", message: "Statistiche argomento aggiornate correttamente"});
            })
        }
        else
            return res.send({code:100, title: "Ok", message: "Statistiche argomento aggiornate correttamente"});
    })
};

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}