/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Routers::QuizRouter;
 * Description: classe che gestisce le richieste relative alle operazioni
 * riguardanti un questionario. Componente ConcreteHandler del design pattern
 * Chain of responsibility. Utilizza il modulo Passport;
 * Creation data: 30-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizRouter_20160430;
 * Update data: 30-04-2016;
 * Description: Creata classe e aggiunte prime REST;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

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
        .get(QuizController.getQuizSubscribers);

    app.route('/api/:lang/userquiz/removeUser')
        .put(QuizController.removeUser);

    app.route('/api/:lang/userquizactiveUser')
        .post(QuizController.addActiveUser);
};
