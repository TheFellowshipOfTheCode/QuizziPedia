/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Routers::UserRouter;
 * Description: classe che gestisce le richieste relative alla registrazione,
 * alla gestione della sessione e alla cronologia dei questionari svolti da un
 * utente. Componente ConcreteHandler del design pattern Chain of
 * responsibility. Utilizza il modulo Passport;
 * Relations with other classes:
 * + IN	Server;
 * + OUT ErrorHandler;
 * + OUT NotFoundHandler;
 * + OUT UserController;
 * + OUT SummaryController.
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserRouter_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e inseriti tutti metodi;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var user = require('../Controller/UserController');

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

    app.route('/api/:lang/user/:userId')
        .get(user.userManagement.getInfo)

    app.route('/api/:lang/user')
        .delete(user.userManagement.deleteUser)

    app.route('/api/:lang/user/statistics')
        .put(user.updateStatisticUser);

};
