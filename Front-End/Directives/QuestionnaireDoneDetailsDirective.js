/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::QuestionnaireDoneDetailsDirective;
 * Description:  rappresenta il componente grafico che permette all’utente di
 visualizzare la lista di questionari che ha già compilato e di conseguenza
 vederne le valutazioni;
 * Creation data: 12-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160512
 * Update data: 12-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('questionnaireDoneDetailsDirective', questionnaireDoneDetailsDirective);

function questionnaireDoneDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/questionnaireDoneDetailsDirective.html',
        link: questionnaireDoneDetailsDirectiveFunction
    };
  return directive;
}

questionnaireDoneDetailsDirectiveFunction.$inject = ['$scope'];

function questionnaireDoneDetailsDirectiveFunction ($scope) {
  $scope.currentPage = 0;
  $scope.pageSize = 7;
  $scope.isActive = true;

  $scope.goOn = function () {
  angular.element(".scrollable").scrollTop(0,0);
  $scope.currentPage=$scope.currentPage+1;
  }

  $scope.goBack = function () {
  angular.element(".scrollable").scrollTop(0,0);
  $scope.currentPage=$scope.currentPage-1;
  }

  $scope.numberOfPages=function(numberOfQuestions){
  var value;
    if(numberOfQuestions%$scope.pageSize > 0) {
      value = Math.floor(numberOfQuestions/$scope.pageSize)+1;
    }
    else {
      value = Math.floor(numberOfQuestions/$scope.pageSize);
    }
    return value;
  };

  $scope.rightColor = function () {
  $scope.isActive= !$scope.isActive;
  }
}
