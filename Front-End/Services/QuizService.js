/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::QuizService;
 * Description: service che gestisce le richieste per i questionari;
 *
 *
 * Creation data: 01-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: QuizServices_20160504;
 * Update data: 04-05-2016;
 * Description: Inseriti i metodi getUsersForThisQuestionnaire() e
 * approveSubscribeQuestionnaire();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuizServices_20160503;
 * Update data: 03-05-2016;
 * Description: Inseriti i metodi getTopic(), getQuiz(), getDoneQuestionnaire(),
 * subscribeQuestionnaire(), getSubscribedQuestionnaire(), setQuizResult();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuizServices_20160502;
 * Update data: 02-05-2016;
 * Description: Inseriti i metodi createQuestionnaire(), showAllCreatedQuestionnaires(),
 * showAllQuestions();
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 * ID: QuizServices_20160501;
 * Update data: 01-05-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuizService', QuizService);

QuizService.$inject = ['$http', '$cookies', '$q'];

function QuizService($http, $cookies, $q) {
    var methods = {
        createQuestionnaire: createQuestionnaire,
        showAllCreatedQuestionnaires: showAllCreatedQuestionnaires,
        showAllQuestions: showAllQuestions,
        getTopic: getTopic,
        getQuiz : getQuiz,
        getDoneQuestionnaire : getDoneQuestionnaire,
        subscribeQuestionnaire: subscribeQuestionnaire,
        getSubscribedQuestionnaire: getSubscribedQuestionnaire,
        setQuizResult:setQuizResult,
        getUsersForThisQuestionnaire:getUsersForThisQuestionnaire,
        approveSubscribeQuestionnaire:approveSubscribeQuestionnaire,
        getApprovedQuestionnaire : getApprovedQuestionnaire,
        startQuiz:startQuiz
    };

    return methods;

    function getTopic(lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/topics')
            .then(function(topic) {
                deferred.resolve(topic);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function createQuestionnaire(title, author, keyword, topic, questions ,lang) {
        var deferred = $q.defer();
        var quizJSON = {title: title, author: author, keyword: keyword, questions:questions, topic: topic};
        $http.post('/api/' + lang + '/userquiz', quizJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function showAllCreatedQuestionnaires(lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/userquiz')
            .then(function(personalQuizzes) {
                deferred.resolve(personalQuizzes);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function showAllQuestions(topic, keywords, lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/allquestions/'+topic+'/'+keywords)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getQuiz(lang, quizId) {
      var deferred = $q.defer();
      $http.get('/api/' + lang + '/userquiz/'+quizId)
          .then(function(data) {
              deferred.resolve(data);
          }, function(error){
              deferred.reject(error);
          });
      return deferred.promise;
    }

    function getDoneQuestionnaire(lang){
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/userdonequizzes')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function subscribeQuestionnaire(quizId, lang){
        var subscribe = {quizId: quizId};
        var deferred = $q.defer();
        $http.post('/api/' + lang + '/usersubscribe', subscribe)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getSubscribedQuestionnaire(lang){
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/usersubscribe')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getApprovedQuestionnaire(lang){
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/userapproved')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function setQuizResult(lang, resultOfQuiz) {
        var q = JSON.stringify(resultOfQuiz, null, "  ");
        var deferred = $q.defer();
        $http.post('/api/'+ lang + '/user/quiz/summary', q)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getUsersForThisQuestionnaire(quizId, lang){
        var deferred = $q.defer();
        $http.get('/api/'+ lang + '/userquizsubscribe/' + quizId)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function approveSubscribeQuestionnaire(userId, quizId, lang){
        var params = {userId:userId, quizId:quizId};
        var deferred = $q.defer();
        $http.post('/api/'+ lang + '/userquizactiveUser' , params)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }



    function startQuiz(quizId, lang){
        var deferred = $q.defer();
        $http.put('/api/'+ lang + '/quizactive/' + quizId)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

}
