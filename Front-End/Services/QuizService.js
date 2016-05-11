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
        getTopic: getTopic
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

    function createQuestionnaire(title, author, keyword, topic, lang) {
        var deferred = $q.defer();
        var quizJSON = {title: title, author: author, keyword: keyword, topic: topic};
        $http.post('/api/' + lang + '/user/quiz', quizJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }
    
    function showAllCreatedQuestionnaires(id, lang) {
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/user/quiz')
            .then(function(personalQuizzes) {
                deferred.resolve(personalQuizzes);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function showAllQuestions(keywords, topic, lang) { 
        var deferred = $q.defer();
        $http.get('/api/' + lang + '/allquestions/'+topic+'/'+keywords)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }
    
}
