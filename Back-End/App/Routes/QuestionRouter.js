var Topic = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");

module.exports = function(app){
    // API
    
    app.route('/api/:lang/topics')
        .get(Question.getTopic)

   

    app.route('/api/:lang/userquestion')
        .post(Question.createQuestion)
        .put(Question.editQuestion)
        .get(Question.getQuestions);

    app.route('/api/:lang/userquestion/:questionId')
        .get(Question.getQuestion);

    app.route('/api/:lang/usertraining/questionstatistics')
        .put(Question.updatestatisticsQuestion);

    app.route('/api/upload')
        .post(Question.uploadImage);

    app.route('/api/:lang/allquestions/:topicname/:keywords')
        .get(Question.getAllQuestions);


    app.route('/api/:lang/user/training/question')
        .post(Topic.getNextQuestion);

    app.route('/api/:lang/topic/keywords')
        .post(Topic.getKeywords);
};
