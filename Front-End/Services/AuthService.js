/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::AuthService;
 * Description: questa classe permette di gestire la registrazione e
 * l’autenticazione di un utente.
 *
 *
 * Creation data: 27-04-2016
 * Author: Alberto Ferrara
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: AuthService_20160504
 * Update data: 04-05-2016
 * Description: Ultimata la classe con i metodi getNewPassword(), giveMe(),
 * resetCookies() e isLogged().
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: AuthService_20160502
 * Update data: 02-05-2016
 * Description: Aggiornate funzioni signIn e signUp con gestione corretta promise.
 * Autore: Alberto Ferrara
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
        getNewPassword: getNewPassword,
        giveMe: giveMe,
        resetCookies: resetCookies
    };

    return methods;

    function isLogged() {
        return $cookies.get('logged');
    }

    function resetCookies() {
        $cookies.remove('logged');
    }

    function signIn(username, password, lang) {
        if(!username || !password) return; //errore?
        var deferred = $q.defer();
        var userJSON = {username: username, password: password};
        $http.post('/api/'+ lang + '/signin', userJSON)
            .then(function(data) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('logged', true , {'expires': expireDate} );
                deferred.resolve(data);
            }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function giveMe(lang) {
        var deferred = $q.defer();
        $http.get('/api/'+ lang + '/loggedin')
            .then(function(data) {
              var q = JSON.stringify(data, null, "  ");
                $cookies.putObject('logged', true );
                deferred.resolve(data);
            }
            ,function(error) {
                deferred.reject(error);
        });
        return deferred.promise;
    }

    function logout(username) {
        $cookies.remove('logged');
    }

    function signUp(username, password, email, name, surname, lang) {
        if(!username || !password || !email || !name || !surname || !lang) return;
        var deferred = $q.defer();
        var userJSON = {username: username, password: password, email: email, name: name, surname: surname};
        $http.post('/api/' + lang + '/signup', userJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    //Da aggiornare
    function getNewPassword(email, lang) {
        var userJSON = {username: email};
        $http.post('/api/' + lang + '/recovery', userJSON)
            .then(function(data) {
                return data;
            })
            .catch(function(){
                return new ErrorInfoModel("4", "Il recupero password non è andato a buon fine", "Recupero password " +
                    "non effettuato");
            })
    }
}
