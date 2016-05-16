/*******************************************************************************
 * Name: QuizziPedia::Front-End::Views::QuestionnaireManagementController
 * Description: controller che gestisce la gestione dei questionari;
 *
 *
 * Creation data: 26-04-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireManagementController_20160427;
 * Update data: 27-04-2016;
 * Description: Aggiunti i metodi goToCreateQuestionnaire() e goToShowAllCreatedQuestionnaires();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireManagementController_20160426
 * Update data: 26-04-2016
 * Description: creazione della classe;
 * Author: Mattia Varotto
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('QuestionnaireManagementController', QuestionnaireManagementController);

QuestionnaireManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav', 'ErrorInfoModel'];

function QuestionnaireManagementController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav, ErrorInfoModel) {

    $scope.goToCreateQuestionnaire = function() {
        $location.path('/'+$routeParams.lang+'/createquestionnaire');
    }

    $scope.goToShowAllCreatedQuestionnaires = function() {
        $location.path('/'+$routeParams.lang+'/showallcreatedquestionnaires');
    }
}