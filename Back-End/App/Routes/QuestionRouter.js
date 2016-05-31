/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Routers::QuestionRouter;
 * Description: classe che gestisce le richieste relative alle operazioni
 * riguardanti le domande. Componente ConcreteHandler del design pattern Chain
 * of responsibility. Utilizza il modulo Passport;
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionRouter_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e aggiunte prime REST;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var Topic = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");


module.exports = function(app){

    app.route('/api/:lang/topics')
        .get(Topic.getTopic);

    app.route('/api/:lang/userquestion')
        .post(Question.createQuestion)
        .put(Question.editQuestion)
        .get(Question.getQuestions);
    

    app.route('/api/:lang/userquestion/:questionId')
        .get(Question.getQuestion)
        .put(Question.uploadImageQuestion);

    app.route('/api/:lang/usertraining/questionstatistics')
        .put(Question.updatestatisticsQuestion);

    app.route('/api/:lang/allquestions/:topicname/:keywords')
        .get(Topic.getAllQuestions);

    app.route('/api/:lang/user/training/question')
        .post(Topic.getNextQuestion);

    app.route('/api/:lang/topic/keywords')
        .post(Topic.getKeywords);
};
