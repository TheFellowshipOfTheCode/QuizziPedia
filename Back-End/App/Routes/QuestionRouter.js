//var TopicController = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");


// 'image' è il valore dell'attributo name dell'input

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
    app.route('/api/:lang/topic')
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
};