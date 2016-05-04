/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers:CreateQuestionnaireController;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireController_20160503;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuizService', QuizService);

QuizService.$inject = ['$http', '$cookies', '$q'];

function QuizService($http, $cookies, $q) {
    var methods = {
        createQuestionnaire: creaQuestionnaire
    };

    return methods;

    function createQuestionnaire(name, keywords,selectedItem, lang) {
        var deferred = $q.defer();
        var quizJSON = {name: name, keywords: keywords, selectedItem: selectedItem};
        $http.post('/api/' + lang + '/user/quiz', quizJSON)
            .then(function(data) {
                deferred.resolve(data);
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }
}
