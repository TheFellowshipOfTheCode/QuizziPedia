var QuizController = require('../Controller/QuizController.js');

module.exports = function(app){
    app.route('/api/:lang/userquiz')
        .post(QuizController.createQuiz)
        .put(QuizController.editQuiz)
        .get(QuizController.getPersonalQuizzes);

    app.route('/api/:lang/userquiz/:quizId')
        .get(QuizController.getQuiz);

    app.route('/api/:lang/searchquiz/:keyword')
        .get(QuizController.searchQuiz);

    app.route('/api/:lang/usersubscribe')
        .get(QuizController.getQuizSubscribe)
        .post(QuizController.subscribeUser);

    app.route('/api/:lang/userquizsubscribe/:quizId')
        .get(QuizController.getQuizSubscribers)
    

    app.route('/api/:lang/userquiz/removeUser')
        .put(QuizController.removeUser);

    app.route('/api/:lang/userquiz/activeUser')
        .post(QuizController.addActiveUser);
}
