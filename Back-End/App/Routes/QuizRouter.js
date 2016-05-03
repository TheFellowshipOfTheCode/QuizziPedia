var QuizController = require('../Controller/QuizController.js');

module.exports = function(app){
    app.route('/api/:lang/user/quiz')
        .post(QuizController.createQuiz)
}
