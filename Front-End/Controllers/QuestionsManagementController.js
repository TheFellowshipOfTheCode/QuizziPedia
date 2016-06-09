/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::QuestionsManagementController;
 * Description: questa classe permette di gestire le domande utente;
 *
 *
 * Creation data: 04-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * ID: QuestionsManagementController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 * ID: QuestionsManagementController_20160511
 * Update data: 11-05-2016
 * Description: Scritti i metodi goToWizardCreation() e goToQMLCreation();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuestionsManagementController_20160510
 * Update data: 10-05-2016
 * Description: Scritti i metodi loadQuestions(), editQuestion(), uploadImage();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuestionsManagementController_20160504
 * Update data: 04-05-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('QuestionsManagementController', QuestionsManagementController);

QuestionsManagementController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'ErrorInfoModel', 'ngMeta'];

function QuestionsManagementController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, ErrorInfoModel, ngMeta){

    if ($rootScope.listOfKeys!=undefined){
        metaData();
    }
    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            metaData();
        }
    });
    $scope.$on('$destroy', langDownloaded);

    function metaData() {
        ngMeta.setTitle($rootScope.listOfKeys.questionsManagement);
        ngMeta.setTag('description',$rootScope.listOfKeys.questionsManagementDescription);
    }

    if($rootScope.userLogged != undefined){
        loadQuestions();
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
        if(args){
            loadQuestions();
        }
        })
        $scope.$on('$destroy', ist);
    }

    function loadQuestions(){
        var username = $rootScope.userLogged.getUsername();
        if(username){
            QuestionsService.getUsersQuestions($routeParams.lang)
                .then(function(result){
                    if(result.data != undefined) {
                        $scope.questions = result.data;
                    }
                } ,function (err){
                    $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento domande non andato a buon fine");
                    alert = $mdDialog.alert()
                        .title($scope.error.getTitle())
                        .content($scope.error.getMessage())
                        .ok('Ok');
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                        });
                });
        }
    };

    $scope.editQuestion = function (idQuestion) {
        $location.path('/'+$routeParams.lang+'/QML/' + idQuestion);
    };

    $scope.goToWizardCreation = function(){
      alert = $mdDialog.alert()
          .title($rootScope.listOfKeys.funtionalityNotImplementedTitle)
          .content($rootScope.listOfKeys.funtionalityNotImplemented)
          .ok('Ok');
      $mdDialog
          .show( alert )
          .finally(function() {
              alert = undefined;
          });
    }

    $scope.goToQMLCreation = function(){
        $location.path('/' + $routeParams.lang + '/QML');
    }

}
