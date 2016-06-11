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
        modifyProfile: modifyProfile,
        changeAccount: changeAccount,
        deleteAccount: deleteAccount
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

    function modifyProfilePwd(name, surname, email,image, password, lang) {
        if(!password || !email || !name || !surname || !image || !lang) return;
        var deferred = $q.defer();
        var formData = new FormData();
        formData.append("file", image);
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        var pwdJSON = {password: password};
        $http.put('/api/' + lang + '/user/info', formData, {
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        })
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


    function modifyProfile(name, surname, email, image, lang) {
        if(!email || !name || !surname || !image || !lang) return;
        var deferred = $q.defer();
        var formData = new FormData();
        formData.append("file", image);
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        $http.put('/api/' + lang + '/user/info', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function changeAccount(lang) {
        var deferred = $q.defer();
        $http.put('/api/' + lang + '/user/type')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function deleteAccount(lang) {
        var deferred = $q.defer();
        $http.delete('/api/' + lang + '/user')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });

        return deferred.promise;
    }
}