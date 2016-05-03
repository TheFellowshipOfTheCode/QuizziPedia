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
var Question = require('../Model/QuestionModel');

exports.createQuestion = function(req, res) {
    Question.createQuestion(req.user._id,req.body, function(err, question){
        console.log(err)
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "Domanda non creata"});
        else return res.send.json({code:90, title: "Ok Domanda", message: "Domanda creata correttamente"});
    })
};

exports.editQuestion = function(req, res) {
    Question.editQuestion(req.body, function(err, question){
        if(err) return res.status(500).json({code:88, title: "Errore Domanda", message: "Domanda non creata"});
        else return res.send(question);
    })
};
