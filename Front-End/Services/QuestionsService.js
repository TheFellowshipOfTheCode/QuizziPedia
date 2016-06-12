/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::QuestionsService;
 * Description: questa classe permette di gestire l'inserimento di una domanda.
 *
 *
 * Creation data: 03-05-2016
 * Author: Alberto Ferrara
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_09052016
 * Update data: 09-05-2016
 * Description: Inseriti i metodi getTopics(), updateStatisticsUser(),
 * updateStatisticsQuestion(), updateStatisticsQuestion(), uploadImge() e
 * updateStatisticsTopic().
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_04052016
 * Update data: 04-05-2016
 * Description: Inseriti i metodi sendQuestion(), getUsersQuestions(),
 * getQuestion(), getNextQuestion() e getKeywords().
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 * ID: QuestionsService_03052016
 * Update data: 03-05-2016
 * Description: Creato il file.
 * Autore: Alberto Ferrara
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionsService', QuestionsService);

QuestionsService.$inject = ['$http', '$cookies', '$q'];

function QuestionsService($http, $cookies, $q) {
    var methods = {
        sendQuestion: sendQuestion,
        getUsersQuestions: getUsersQuestions,
        getQuestion: getQuestion,
        getNextQuestion: getNextQuestion,
        getKeywords : getKeywords,
        getTopics : getTopics,
        updateStatisticsUser : updateStatisticsUser,
        updateStatisticsQuestion : updateStatisticsQuestion,
        updateStatisticsTopic : updateStatisticsTopic,
        uploadImageQuestion: uploadImageQuestion
    };
    return methods;

    function sendQuestion(question, lang, id) {
      console.log(JSON.stringify(question));
        var deferred = $q.defer();
        if(id == undefined) {
            $http.post('/api/' + lang + '/userquestion',question)
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });
        }
        else{
            $http.put('/api/' + lang + '/userquestion', question)
                .then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        return deferred.promise;
    }

    function uploadImageQuestion(questionId,images,lang,id){
        var deferred = $q.defer();
        var formData = new FormData();
        formData.append('edit',id);
        for (var i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }
        if(id)
            questionId=id
        $http.put('/api/' + lang + '/userquestion/'+questionId, formData, {
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
            })
            .then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getUsersQuestions(lang) {
        var deferred = $q.defer();

        $http.get('/api/' + lang +'/userquestion')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getQuestion(questionId, lang) {
        var deferred = $q.defer();

        $http.get('/api/'+ lang + '/userquestion/' + questionId)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getNextQuestion(lang, nextQuestion) {
            var q = JSON.stringify(nextQuestion, null, "  ");
            var deferred = $q.defer();
            $http.post('/api/'+ lang + '/user/training/question', q)
                .then(function(data) {
                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

    function getKeywords(lang,topic) {
        var deferred = $q.defer();
        $http.post('/api/'+ lang + '/topic/keywords', {topic : topic})
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function getTopics(lang) {
       var deferred = $q.defer();
        $http.get('/api/'+ lang + '/topics')
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function updateStatisticsUser(lang, updateTheStatistics) {
        var deferred = $q.defer();
        $http.put('/api/'+ lang + '/user/statistics', updateTheStatistics)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function updateStatisticsTopic(lang, updateTheStatistics) {
        var deferred = $q.defer();
        $http.put('/api/'+ lang + '/topic/statistics', updateTheStatistics)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function  updateStatisticsQuestion(lang, updateTheStatistics) {
        var deferred = $q.defer();
        $http.put('/api/'+ lang + '/usertraining/questionstatistics', updateTheStatistics)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }



}
