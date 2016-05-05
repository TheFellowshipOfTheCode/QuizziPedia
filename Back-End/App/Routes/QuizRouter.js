var QuizController = require('../Controller/QuizController.js');

module.exports = function(app){
    app.route('/api/:lang/user/quiz')
        .post(QuizController.createQuiz)
        .put(QuizController.editQuiz);

    app.route('/api/:lang/user/quiz/:quizId')
        .get(QuizController.getQuiz);

    app.route('/api/:lang/user/quiz/addUser')
        .post(QuizController.addUser);

    app.route('/api/:lang/user/quiz/removeUser')
        .put(QuizController.removeUser);

    app.route('/api/:lang/user/quiz/activeUser')
        .post(QuizController.addActiveUser);

    app.route('/api/:lang/user/quiz')
        .get(QuizController.getPersonalQuizzes);
}
