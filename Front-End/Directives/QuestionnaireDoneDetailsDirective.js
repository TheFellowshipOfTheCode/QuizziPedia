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
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160526
 * Update data: 26-05-2016
 * Description: Corretto vari bug e sistemato grafica in modo che sia
 * responsive;
 * Author: Matteo Granzotto.
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
        templateUrl: 'Directives/QuestionnaireDoneDetailsDirective.html',
        link: questionnaireDoneDetailsDirectiveFunction
    };
  return directive;
}

questionnaireDoneDetailsDirectiveFunction.$inject = ['$scope'];

function questionnaireDoneDetailsDirectiveFunction ($scope) {
  $scope.currentPageLineOne = 0;
  $scope.pageSize = 7;
  $scope.isActive = true;

  $scope.goOnOne = function () {
  $scope.currentPageLineOne=$scope.currentPageLineOne+1;
  }

  $scope.goBackOne = function () {
  $scope.currentPageLineOne=$scope.currentPageLineOne-1;
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
