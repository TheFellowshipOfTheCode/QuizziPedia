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

function AuthService($http, $cookies, $q) {
    var methods = {
        isLogged: isLogged,
        signIn: signIn,
        logout: logout,
        signUp: signUp,
        getNewPassword: getNewPassword
    };

    return methods;

    function isLogged() {
        return $cookies.get('logged');
    }

    function signIn(username, password, lang) {
        if(!username || !password) return; //errore?
        var deferred = $q.defer();
        var userJSON = {username: username, password: password};
        $http.post('/api/'+ lang + '/signin', userJSON)
            .then(function(data) {
                console.log(data);
                deferred.resolve(data);
            })
            , function(error) {
            deferred.reject(error);
            console.log("Incorrect login");
            throw error;
        };
        return deferred.promise;
    }

    function logout(username) {
        var userJSON = {username: username};
        $http.post('/api/signout', userJSON)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("2", "La logout non è andata a buon fine", "Logout non effettuata");
            })
    }

    function signUp(username, password, email, name, surname, lang) {
        if(!username || !password || !email || !name || !surname || !lang) return;
        var deferred = $q.defer();
        var userJSON = {username: username, password: password, email: email, name: name, surname: surname};
        $http.post('/api/' + lang + '/signup', userJSON)
            .then(function(data) {
                console.log(data);
                deferred.resolve(data);
            })
            ,function(error){
                deferred.reject(error);
                console.log("Incorrect signup");
                throw error;
            };
        return deferred.promise;
    }

    function getNewPassword(email) {
        var userJSON = {username: email};
        $http.post('/api/recovery', userJSON)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("4", "Il recupero password non è andato a buon fine", "Recupero password " +
                    "non effettuato");
            })
    }
}