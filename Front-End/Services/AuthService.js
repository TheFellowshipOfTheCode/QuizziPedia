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
                //qui devo creare l'ErrorInfoModel con i dati dell'errore
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
            .catch(function(data){
                //qui devo creare l'ErrorInfoModel con i dati dell'errore
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
            .catch(function(data){
                //qui devo creare l'ErrorInfoModel con i dati dell'errore
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
            .catch(function(err){
                //qui devo creare l'ErrorInfoModel con i dati dell'errore
            })
    }
  }