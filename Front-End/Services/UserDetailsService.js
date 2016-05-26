/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::UserDetailsService;
 * Description: questa classe permette di gestire il recupero dei dati utente.
 *
 *
 * Creation data: 12-05-2016
 * Author: Alberto Ferrara
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_13052016
 * Update data: 13-05-2016
 * Description: Ultimato il service con il metodo getUserDetails();
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_12052016
 * Update data: 12-05-2016
 * Description: Creato il file.
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('UserDetailsService', UserDetailsService);

UserDetailsService.$inject = ['$http', '$cookies', '$q'];

function UserDetailsService($http, $cookies, $q) {
    var methods = {
        getUserDetails: getUserDetails,
        modifyProfilePwd: modifyProfilePwd,
        modifyProfile: modifyProfile
    };
    return methods;

    function getUserDetails(username, lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/userdetails/' + username)
            .then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function modifyProfilePwd(name, surname, email, password, lang) {
        if(!password || !email || !name || !surname || !lang) return;
        var deferred = $q.defer();
        var userJSON = {name: name, surname: surname, email: email};
        var pwdJSON = {password: password};
        $http.put('/api/' + lang + '/user/info', userJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });

        $http.put('/api/' + lang + '/user/password', pwdJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        
        return deferred.promise;
    }

    function modifyProfile(name, surname, email, lang) {
        if(!email || !name || !surname || !lang) return;
        var deferred = $q.defer();
        var userJSON = {name: name, surname: surname, email: email};
        $http.put('/api/' + lang + '/user/info', userJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    }
}