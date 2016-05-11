/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::SearchService;
 * Description: questa classe permette di gestire il recuper per una ricerca.
 * Relations with other classes:
 * +
 * Creation data: 11-05-2016
 * Author: Alberto Ferrara
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SearchService_11052016
 * Update data: 11-05-2016
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
        //console.log(tosearch);
        // if(tosearch == undefined) return; //errore?
        var deferred = $q.defer();
        //console.log("search: " + tosearch);
        $http.get('/api/' + lang + '/searchuser/' + tosearch)
            .then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }


     function searchQuestionnaire(tosearch, lang) {
     // if(tosearch == undefined) return; //errore?
     var deferred = $q.defer();
     //console.log("search: " + tosearch);
     $http.get('/api/' + lang + '/searchquiz/' + tosearch)
     .then(function (data) {
     deferred.resolve(data);
     }, function (error) {

         deferred.reject(error);
     });
         return deferred.promise;
     }

}