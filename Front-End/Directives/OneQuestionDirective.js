/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::OneQuestionDirective;
 * Description: rappresenta il componente grafico che visualizza all’utente
 l’anteprima della domanda che ha creato. Eseguendo l’azione di click sul
 pulsante di modifica sarà possibile modificare tale domanda. All’interno di
 QuestionsManagementsView verranno stampati a video tanti componenti quanti
 presenti nello $scope isolato ad esso associato;
 * Creation data: 04-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: OneQuestionDirective_20160504
 * Update data: 04-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('oneQuestionDirective', oneQuestionDirective);

function oneQuestionDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/OneQuestionDirective.html',
        link: oneQuestionDirectiveFunction
    };
    return directive;
}

oneQuestionDirectiveFunction.$inject = ['$scope'];

function oneQuestionDirectiveFunction ($scope) {
  $scope.currentPage = 0;
  $scope.pageSize = 15;
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
