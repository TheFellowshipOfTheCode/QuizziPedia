/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::SearchService;
 * Description: questa classe permette di gestire il recupero per una ricerca.
 *
 * 
 * Creation data: 09-05-2016
 * Author: Alberto Ferrara
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: SearchService_12052016
 * Update data: 12-05-2016
 * Description: Inserito il metodo searchQuestionnaire().
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: SearchService_10052016
 * Update data: 10-05-2016
 * Description: Inserito il metodo searchUsers().
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: SearchService_09052016
 * Update data: 09-05-2016
 * Description: Creato il file.
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('SearchService', SearchService);

SearchService.$inject = ['$http', '$cookies', '$q'];

function SearchService($http, $cookies, $q) {
    var methods = {
        searchUsers: searchUsers,
        searchQuestionnaire: searchQuestionnaire
    };
    return methods;

    function searchUsers(tosearch, lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/searchuser/' + tosearch)
            .then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }


     function searchQuestionnaire(tosearch, lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/searchquiz/' + tosearch)
            .then(function (data) {
                 deferred.resolve(data);
            }, function (error) {
               deferred.reject(error);
             });
         return deferred.promise;
     }
}