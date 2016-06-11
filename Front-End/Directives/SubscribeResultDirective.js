/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::SubscribeResultDirective;
 * Description: rappresenta un questionario ricercato;
 * Creation data: 10-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SubscribeResultDirective_20160510
 * Update data: 10-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('subscribeResultDirective', subscribeResultDirective);

function subscribeResultDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/SubscribeResultDirective.html',
        link: subscribeResultDirectiveFunction
    };
    return directive;
}

subscribeResultDirectiveFunction.$inject = ['$scope'];

function subscribeResultDirectiveFunction ($scope) {
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

    $scope.numberOfPages=function(numberOfQuizzes){
        var value;
        if(numberOfQuizzes%$scope.pageSize > 0) {
            value = Math.floor(numberOfQuizzes/$scope.pageSize)+1;
        }
        else {
            value = Math.floor(numberOfQuizzes/$scope.pageSize);
        }
        return value;
    };

    $scope.rightColor = function () {
        $scope.isActive= !$scope.isActive;
    }
}
