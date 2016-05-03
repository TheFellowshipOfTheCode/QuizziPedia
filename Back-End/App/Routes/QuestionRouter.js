var Topic = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");


module.exports = function(app){
    // API
    app.route('/api/:lang/user/training/question')
        .post(Topic.getNextQuestion);

    app.route('/api/:lang/user/question')
        .post(Question.createQuestion);
};