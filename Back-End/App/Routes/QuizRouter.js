var QuizController = require('../Controller/QuizController.js');

module.exports = function(app){
    app.route('/api/:lang/user/quiz')
        .post(QuizController.createQuiz)

    app.route('/api/:lang/user/quiz/:quizId')
        .get(QuizController.getQuiz)

    app.route('/api/:lang/user/quiz/addUser')
        .post(QuizController.addUser)
}
