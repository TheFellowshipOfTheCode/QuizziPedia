/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::QuestionnaireDetailsDirective;
 * Description: rappresenta il componente grafico che permette all’utente di
    visualizzare la lista di questionari che può compilare;
 * Creation data: 13-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160513
 * Update data: 13-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('questionnaireDetailsDirective', questionnaireDetailsDirective);

function questionnaireDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/questionnaireDetailsDirective.html',
        link: questionnaireDetailsDirectiveFunction
    };
    return directive;
    }

    questionnaireDetailsDirectiveFunction.$inject = ['$scope'];

  function questionnaireDetailsDirectiveFunction ($scope) {
    $scope.currentPageLineTrhee = 0;
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
