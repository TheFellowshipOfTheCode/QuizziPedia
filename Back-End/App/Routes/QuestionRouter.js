//var TopicController = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");


module.exports = function(app){
    // API
    /*
    app.post('/api/:lang/user/training/question', function(req, res){
        console.log("/api/"+req.params.lang);
        var language = req.params.lang;
        TopicController.getNextQuestion(language, function (result) {
            res.json(result);
        });
    });*/
    
    app.route('/api/:lang/user/question')
        .post(Question.createQuestion)
        .put(Question.editQuestion);

    app.route('/api/:lang/userquestions')
        .get(Question.getQuestions);

    app.route('/api/:lang/user/training/questionstatistics')
        .put(Question.updatestatisticsQuestion);

    
};