/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::QuizService;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizServices_20160504;
 * Update data: 27-04-2016;
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
        getSubscribedQuestionnaire: getSubscribedQuestionnaire
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

    function showAllCreatedQuestionnaires(id, lang) {
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
        console.log("ciao")
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
      console.log(quizId);
      var deferred = $q.defer();
      $http.get('/api/' + lang + '/userquiz/'+quizId)
          .then(function(data) {
            console.log(data);
              deferred.resolve(data);
          }, function(error){
              deferred.reject(error);
          });
      return deferred.promise;
    }

    function getDoneQuestionnaire(lang){
        var deferred = $q.defer();
        $http.post('/api/' + lang + '/user/donequizzes')
            .then(function(data) {
                console.log(data);
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



}
