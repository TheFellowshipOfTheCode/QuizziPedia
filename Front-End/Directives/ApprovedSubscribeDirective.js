/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::ApprovedSubscribeDirective;
 * Description: rappresenta il componente grafico che permette all’utente di
 visualizzare la lista di questionari che può compilare;
 * Creation data: 13-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: ApprovedSubscribeDirective_20160526
 * Update data: 26-05-2016
 * Description: Corretto vari bug e sistemato grafica in modo che sia
 * responsive;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160513
 * Update data: 13-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('approvedSubscribeDirective', approvedSubscribeDirective);

function approvedSubscribeDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/ApprovedSubscribeDirective.html',
        link: approvedSubscribeDirectiveFunction
    };
    return directive;
}

approvedSubscribeDirectiveFunction.$inject = ['$scope'];

function approvedSubscribeDirectiveFunction ($scope) {
    $scope.currentPageLineTwo = 0;
    $scope.pageSize = 7;
    $scope.isActive = true;

    $scope.goOnTwo = function () {
        $scope.currentPageLineTwo=$scope.currentPageLineTwo+1;
    }

    $scope.goBackTwo = function () {
        $scope.currentPageLineTwo=$scope.currentPageLineTwo-1;
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
