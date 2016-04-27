/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::UserController;
 * Description: classe che raggruppa attraverso require i vari controllers
 * responsabili delle operazioni legate alla gestione degli utenti. Si è scelto
 * di predisporre questo raggruppamento per facilitare l'introduzione di nuove
 * funzionalità legate alla gestione degli utenti;
 * Relations with other classes:
 * + IN	UserRouter;
 * + OUT SessionController;
 * + OUT AuthenticationController;
 * + OUT UserManagementController.
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserController_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e inserite le require;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var user = require('../Controller/UserController');

module.exports = function(app){

    app.route('/:lang/signup')
        .post(user.signup);

    app.route('/:lang/signin')
        .post(user.signin);

    app.route('/:lang/signout')
        .post(user.signout);

    app.route('/:lang/recovery')
        .post(user.recovery);

    app.route('/:lang/loggedin')
        .get(user.loggedin);

};
