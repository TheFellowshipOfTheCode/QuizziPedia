/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::UserResultsDirective;
 * Description: rappresenta un utente ricercato;
 * Creation data: 10-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: UserResultsDirective_20160510
 * Update data: 10-05-2016
 * Description: Creata la classe e ultimato i metodi: goOn(), goBack(), numberOfPages() rigthColor();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('userResultsDirective', userResultsDirective);

function userResultsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/UserResultsDirective.html',
        link: userResultsDirectiveFunction
    };
    return directive;
}

userResultsDirectiveFunction.$inject = ['$scope'];

function userResultsDirectiveFunction ($scope) {
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

    $scope.numberOfPages=function(numberOfUsers){
        var value;
        if(numberOfUsers%$scope.pageSize > 0) {
            value = Math.floor(numberOfUsers/$scope.pageSize)+1;
        }
        else {
            value = Math.floor(numberOfUsers/$scope.pageSize);
        }
        return value;
    };

    $scope.rightColor = function () {
        $scope.isActive= !$scope.isActive;
    }
}
