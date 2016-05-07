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
    Topic.findTopicByName(req.body.topic, function(err,topic){
        if (err)
            return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
        else
            Topic.getNextQuestion(topic, req.body.alreadyAnswered, req.body.language, req.body.keywords, req.body.level, function(err,question){
                if (err)
                    return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
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
                        if (question.keywords.length==equalKeywords) {
                            count = 0;
                            return res.send(question);
                        }
                    }
                    if(!question || question.keywords.length!=equalKeywords) {
                        if (count < 20) {
                            count++;
                            module.exports.getNextQuestion(req, res);
                        }
                        else return res.status(500).json({
                            code: 757,
                            title: "getNextQuestionError",
                            message: "Non ci sono più domande che rispettino i parametri impostati per questo allenamento"
                        });
                    }
                }
            })
    })
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
            Topic.getKeywords(topic, function(err,keywords){
                if (err)
                    return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
                else {
                    var arrayKeywords=[];
                    keywords.forEach(function(k){
                        arrayKeywords=arrayUnique(arrayKeywords.concat(k.keywords));
                    });
                    return res.json(arrayKeywords);
                }
            })
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