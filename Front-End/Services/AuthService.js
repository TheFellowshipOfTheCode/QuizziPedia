/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::AuthService;
 * Description: questa classe permette di gestire la registrazione e l’autenticazione di un utente.
 * Relations with other classes:
 * + LoginController
 * + PasswordForgotController
 * + SignUpController
 * Creation data: 27-04-2016
 * Author: Alberto Ferrara
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AuthService_20160427
 * Update data: 27-04-2016
 * Description: Creato il file.
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('AuthService', ['$logged', '$http', '$q', '$cookie', function($logged, $http, $q, $cookie) {

    function isLogged(){

    }

    function signIn(email, password){

    }

    function logout(username){

    }

    function signup(username, password, email, nome, cognome){

    }

    function getNewPassword(email){

    }

}]);