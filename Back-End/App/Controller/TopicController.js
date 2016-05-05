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

exports.getNextQuestion = function(req, res) {
    Topic.findTopicByName(req.body.topic, function(err,topic){
        if (err)
            return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
        else
            Topic.getNextQuestion(topic, req.body.arrayQuest, req.body.language, req.body.keywords, req.body.level, function(err,question){
                if (err)
                    return res.status(500).json({code:757, title: "getNextQuestionError", message: "error"});
                else
                if(question)
                    return res.send(question);
                else module.exports.getNextQuestion(req,res);
            })
    })
};