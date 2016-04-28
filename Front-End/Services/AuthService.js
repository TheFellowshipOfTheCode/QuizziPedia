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
        $http.post('/api/signin', user)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                return new ErrorInfoModel("1", "La login non è andata a buon fine", "Login non effettuata");
            });
    }

    function logout(username) {
        var user = [];
        item = {};
        item["username"] = username;
        user.push(item);
        $http.post('/api/signout', user)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("2", "La logout non è andata a buon fine", "Logout non effettuata");
            })
    }

    function signup(username, password, email, nome, cognome) {
        var user = [];
        item = {};
        item["username"] = username;
        item["password"] = password;
        item["email"] = email;
        item["nome"] = nome;
        item["cognome"] = cognome;
        user.push(item);
        $http.post('/api/signup', user)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("3", "La registrazione non è andata a buon fine", "Registrazione non " +
                    "effettuata");
            })
    }

    function getNewPassword(email) {
        var user = [];
        item = {};
        item["username"] = email;
        user.push(item);
        $http.post('/api/recovery', user)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("4", "Il recupero password non è andato a buon fine", "Recupero password " +
                    "non effettuato");
            })
    }
  }