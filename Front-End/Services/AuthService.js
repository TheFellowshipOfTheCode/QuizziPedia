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

app.factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$cookies', '$q'];

    function AuthService() {
    var methods = {
        isLogged: isLogged,
        signIn: singIn,
        logout: logout,
        signup: signup,
        getNewPassword: getNewPassword
    };

    return methods;

    function isLogged() {
        return $cookies.get('logged');
    }

    function signIn(email, password) {
        var user = [];
        item = {};
        item["username"] = email;
        item["password"] = password;
        user.push(item);
        $http.get('')
            .success(function(data) {

            })
            .error(function() {

        });

    function logout(username) {

    }

    function signup(username, password, email, nome, cognome) {

    }

    function getNewPassword(email) {

    }
  }
}