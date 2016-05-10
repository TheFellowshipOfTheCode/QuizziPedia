/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::LangService;
 * Description: questa classe permette di gestire la lingua nella quale si è
 * scelto di utilizzare l’applicazione. Fornisce delle funzionalità per
 * recuperare la giusta traduzione delle pagine;
 * Relations with other classes:
 * + AppRun.
 * Creation data: 27-04-2016;
 * Author: Matteo Granzotto.
 *******************************************************************************
 * Updates history
 *------------------------------------------------------------------------------
 * ID: LangService_20160427;
 * Update data: 27-04-2016;
 * Description: Creato il file;
 * Autore: Matteo Granzotto.
 *------------------------------------------------------------------------------
 ******************************************************************************/

app.factory('LangService', LangService);

LangService.$inject = ['$http', '$q', 'ErrorInfoModel'];

function LangService($http, $q, ErrorInfoModel) {

  var methods = {
    getKeywords : getKeywords
  };
  return methods;

  function getKeywords(lang) {
    var deferred = $q.defer();
    $http.get('/api/' + lang)
     .success(function(data) {
          deferred.resolve(data[0].variables);
     }).error(function(msg, code) {
        deferred.reject(msg);
     });
    return deferred.promise;
  }


}
