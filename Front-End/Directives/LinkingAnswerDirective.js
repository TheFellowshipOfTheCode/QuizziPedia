/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::;
* Description: ;
* Relations with other classes:
* +
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: _20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('linkingAnswerDirective', linkingAnswerDirective);

function linkingAnswerDirective() {
  return {
    restrict: 'E',
    templateUrl: 'Directives/LinkingAnswerDirective.html',
    link: linkingAnswerDirectiveFunction
  };
};

linkingAnswerDirectiveFunction.$inject = ['$scope'];

function linkingAnswerDirectiveFunction ($scope) {

  console.log($scope.arrayDomande);

  $scope.list1 = [];
  $scope.list2 = [];

  $scope.arrayDomande[0].answer.forEach(function(elem, key) {
    $scope.list1.push({});
    if(elem.text2 != undefined) {
      $scope.list2.push({text2 : elem.text2});
    }
    else {
      if(elem.url2 !=undefined) {
        $scope.list2.push({url2 : elem.url1});
      }
    }
  });
  console.log($scope.list2);

  $scope.prova1 = function(index){ //SI
    console.log("Sposto da A a B");

  };
  $scope.prova2 = function(){ //SI
    console.log("Sposto da B a A");
  };
}
