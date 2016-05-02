/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::Users::SessionController;
 * Description: classe middleware che, utilizzando Passport, si occupa di
 * controllare la consistenza dell'oggetto session durante la sessione associata
 * all'utente autenticato. È un componente ConcreteHandler del design pattern
 * Chain of responsibility;
 * Relations with other classes:
 * + IN	UserController;
 * + OUT Session;
 * + OUT UserModel.
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SessionController_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e inserita la funzione;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

exports.loggedin = function(req, res, next) {
    res.send(req.isAuthenticated() ? req.user : '0');
};