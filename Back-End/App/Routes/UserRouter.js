/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Routers::UserRouter;
 * Description: classe che gestisce le richieste relative alla registrazione,
 * alla gestione della sessione e alla cronologia dei questionari svolti da un
 * utente. Componente ConcreteHandler del design pattern Chain of
 * responsibility. Utilizza il modulo Passport;
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserRouter_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e aggiunte prime REST;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var user = require('../Controller/UserController');
var topic = require('../Controller/TopicController');
var summary = require('../Controller/SummaryController');

module.exports = function(app){

    app.route('/api/:lang/signup')
       .post(user.auth.signup);

    app.route('/api/:lang/signin')
        .post(user.auth.signin);

    app.route('/api/:lang/signout')
        .post(user.auth.signout);
/*
    app.route('/:lang/recovery')
        .post(user.recovery);*/

    app.route('/api/:lang/loggedin')
        .get(user.session.loggedin);

    app.route('/api/:lang/user/info')
        .get(user.userManagement.getInfo)
        .put(user.userManagement.updateDataUser);

    app.route('/api/:lang/user')
        .delete(user.userManagement.deleteUser);
    
    app.route('/api/:lang/searchuser/:keyword')
        .get(user.userManagement.searchUser);

    app.route('/api/:lang/user/statistics')
        .put(user.userManagement.updateStatisticUser);

    app.route('/api/:lang/userdonequizzes')
        .get(summary.getQuizzes);

    app.route('/api/:lang/topic/statistics')
        .put(topic.updateStatisticTopic);

    app.route('/api/:lang/user/quiz/summary')
        .post(summary.createSummary);

};
