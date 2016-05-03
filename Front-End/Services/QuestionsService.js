/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::QuestionsService;
 * Description: questa classe permette di gestire l'inserimento di una domanda.
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016
 * Author: Alberto Ferrara
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_03052016
 * Update data: 03-05-2016
 * Description: Creato il file.
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionsService', QuestionsService);

AuthService.$inject = ['$http', '$cookies', '$q'];

function QuestionsService($http, $cookies, $q) {
    var methods = {
        sendQuestion: sendQuestion
    };

    return methods;



    function sendQuestion(question, lang) {
       // if(question == undefined) return; //errore?
        var deferred = $q.defer();

       $http.post('/api/'+ lang + '/user/question', question)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }
}
