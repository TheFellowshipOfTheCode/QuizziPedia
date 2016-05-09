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

QuestionsService.$inject = ['$http', '$cookies', '$q'];

function QuestionsService($http, $cookies, $q) {
    var methods = {
        sendQuestion: sendQuestion,
        getUsersQuestions: getUsersQuestions,
        getQuestion: getQuestion,
        uploadImage: uploadImage
    };

    return methods;



    function sendQuestion(question, lang, id) {
       // if(question == undefined) return; //errore?
        var deferred = $q.defer();
        if(id == undefined) {
            console.log("q" + question);
            $http.post('/api/' + lang + '/userquestion', question)
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

    function getUsersQuestions(lang) {
        // if(username == undefined) return; //errore?
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
        console.log(questionId);
        var deferred = $q.defer();

        $http.get('/api/'+ lang + '/userquestion/' + questionId)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }


    function uploadImage (image) {
        var formData = new FormData();
        formData.append("file", image);
        return $http.post('/api/upload', formData, {
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        });
    }

}
