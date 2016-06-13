/*******************************************************************************
* Name: QuizziPedia::Back-End::App::Controllers::TopicController;
* Description: classe che gestisce la logica applicativa riguardante la
* visualizzazione e la modifica degli argomenti delle domande;
* Creation data: 02-05-2016;
* Author: Marco Prelaz.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: TopicController_20160502;
* Update data: 02-05-2016;
* Description: Creata classe;
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: TopicController_20160503;
* Update data: 03-05-2016;
* Description: Aggiunto un primo prototipo della funzione getNextQuestion;
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: TopicController_20160504;
* Update data: 04-05-2016;
* Description: Aggiunte la funzione getKeywords e la funzione di supporto
* arrayUnique;
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: TopicController_20160506;
* Update data: 05-05-2016;
* Description: Aggiunta la funzione updateStatisticTopic e getNextQuestion è
* stata migliorata;
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
* ID: TopicController_20160513;
* Update data: 13-05-2016;
* Description: getNextQuestion perfezionata;
* Autore: Marco Prelaz.
*-------------------------------------------------------------------------------
*******************************************************************************/
var Topic = require('../Model/TopicModel');
var Question = require('../Model/QuestionModel');

exports.getNextQuestion = function(req, res) {
    if(!req.body.topic){
        return res.status(500).json({code:741, title: "getNextQuestionError", message: "Nessun argomento inserito"});
    }
    else {
        Topic.findTopicByName(req.body.topic, function(err,topic){
            if (err)
                return res.status(500).json({code:721, title: "getNextQuestionError", message: "error"});
            else
            if(req.body.keywords.length!=0) {
                Question.findOne({
                    '_id': {$in: topic.question, $nin: req.body.alreadyAnswered},
                    'language': req.body.language,
                    'keywords': {$in: req.body.keywords},
                    'level': {$gte: req.body.level - 100, $lte: req.body.level + 100}
                }, '_id language question keywords level makeWith author', function (err, q) {
                    if (err)
                        return res.status(500).json({code: 733, title: "getNextQuestionError", message: "error"});
                    Topic.getNextQuestion(topic, req.body.alreadyAnswered, req.body.language, req.body.keywords, req.body.level, function (err, question) {
                        if (err)
                            return res.status(500).json({code: 766, title: "getNextQuestionError", message: "error"});
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
                                if (req.body.keywords.length == equalKeywords) {
                                    return res.send(question);
                                }
                            }
                            if (!question || req.body.keywords.length != equalKeywords) {
                                if(!q) {
                                    req.body.keywords = [];
                                    module.exports.getNextQuestion(req, res);
                                }
                                else {
                                    module.exports.getNextQuestion(req, res);
                                }
                            }
                        }
                    })
                })
            }
            else
                Question.findOne({
                    '_id': {$in: topic.question, $nin: req.body.alreadyAnswered},
                    'language': req.body.language,
                    'level': {$gte: req.body.level - 100, $lte: req.body.level + 100}
                }, '_id language question keywords level makeWith author', function (err, q) {
                    if (err)
                        return res.status(500).json({code: 733, title: "getNextQuestionError", message: "error"});
                    Topic.getNextQuestion(topic, req.body.alreadyAnswered, req.body.language, req.body.keywords, req.body.level, function (err, question) {
                        if (err)
                            return res.status(500).json({code: 766, title: "getNextQuestionError", message: "error"});
                        else {
                            if (!question) {
                                if (!q)
                                    return res.status(500).json({
                                        code: 847,
                                        title: "Allenamento finito",
                                        message: "Non ci sono più domande sull argomento scelto per questo allenamento"
                                    });
                                else {
                                    module.exports.getNextQuestion(req, res);
                                }
                            }
                            else {
                                return res.send(question);
                            }
                        }
                    })
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

exports.getAllQuestions = function(req, res) {
    Topic.getTopicQuestions(req.params.topicname, req.params.keywords.split(','), req.params.lang, function(err, questions) {
        if (err) return res.status(500).json({code:95, title: "Errore Domande", message: "Domande non trovate"});
        else return res.send(questions);
    })
}

exports.getTopic = function(req, res) {
    Topic.getTopic(req.params.lang, function(err, topic) {
        if (err) return res.status(500).json({code:95, title: "Errore Topic", message: "Topic non presenti"});
        else return res.send(topic);
    })
}


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
