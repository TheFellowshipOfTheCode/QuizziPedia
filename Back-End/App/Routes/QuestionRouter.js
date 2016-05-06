//var TopicController = require("../Controller/TopicController");
var Question = require("../Controller/QuestionController");
var multer = require('multer')
var uploading = multer({dest: __dirname + '../../uploadImage/', limits: {fileSize: 1000000, files:1}})

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
    
    app.route('/api/:lang/userquestion')
        .post(Question.createQuestion)
        .put(Question.editQuestion)
        .get(Question.getQuestions);

    app.route('/api/:lang/userquestion/:questionId')
        .get(Question.getQuestion);

    app.route('/api/:lang/usertraining/questionstatistics')
        .put(Question.updatestatisticsQuestion);

    
};