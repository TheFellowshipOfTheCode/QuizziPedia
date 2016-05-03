/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::EditorQMLController;
 * Description: questa classe permette di gestire l'inserimento delle domande QML
 *
 * Relations with other classes:
 * +
 *
 * Creation data: 03-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: EditorQMLController_20160503
 * Update data: 03-05-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('EditorQMLController', EditorQMLController);

EditorQMLController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'QuestionItemModel', 'ErrorInfoModel'];

function EditorQMLController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, QuestionItemModel, ErrorInfoModel){

    $scope.submitQuestion = function(){
        //qui andrà fatto il controllo col parser
        //var question = chiamata al parser che ritorna il JSON

        QuestionsService.submitQuestion(question)
            .then(function(result){
                if(result) {
                    $rootScope.question = new QuestionItemModel();
                    //$location.path('/' + $routeParams.lang + '/home');
                }
            } ,function (err){
                $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
                alert = $mdDialog.alert()
                    .title($scope.error.getTitle())
                    .content($scope.error.getCode()+": "+$scope.error.getMessage())
                    .ok('Ok');
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            });
    }




}
