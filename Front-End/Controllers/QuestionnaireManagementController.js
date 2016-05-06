app.controller('QuestionnaireManagementController', QuestionnaireManagementController);

QuestionnaireManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav', 'ErrorInfoModel'];

function QuestionnaireManagementController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav, ErrorInfoModel) {

    $scope.goToCreateQuestionnaire = function() {
        $location.path('/'+$routeParams.lang+'/createquestionnaireview');
    }

    $scope.goToShowAllCreatedQuestionnaires = function() {
        $location.path('/'+$routeParams.lang+'/showallcreatedquestionnairesview');
    }
}