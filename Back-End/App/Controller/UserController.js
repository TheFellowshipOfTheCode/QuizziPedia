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
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: UserController_20160427;
* Update data: 27-04-2016;
* Description: Creata classe e inserite le require;
* Autore: Franco Berton.
*-------------------------------------------------------------------------------
*******************************************************************************/

module.exports = {
    auth : require('./Users/AuthenticationController'),
    session : require('./Users/SessionController'),
    userManagement : require('./Users/UserManagementController')
}
