var QuizController = require('../Controller/QuizController.js');

module.exports = function(app){
    app.route('/api/:lang/userquiz')
        .post(QuizController.createQuiz)
        .put(QuizController.editQuiz)
        .get(QuizController.getPersonalQuizzes);

    app.route('/api/:lang/userquiz/:quizId')
        .get(QuizController.getQuiz);

    app.route('/api/:lang/searchquiz')
        .post(QuizController.searchQuiz);

    app.route('/api/:lang/userquiz/addUser')
        .post(QuizController.addUser);

    app.route('/api/:lang/userquiz/removeUser')
        .put(QuizController.removeUser);

    app.route('/api/:lang/userquiz/activeUser')
        .post(QuizController.addActiveUser);
}
