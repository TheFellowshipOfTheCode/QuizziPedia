/**
 * Created by francoberton on 01/06/16.
 */



app.controller('OtherUserViewController', OtherUserViewController);

OtherUserViewController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'UserDetailsService', 'QuizService','ngMeta'];

function OtherUserViewController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, UserDetailsService, QuizService, ngMeta) {

    if ($rootScope.listOfKeys!=undefined){
        metaData();
    }

    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            metaData();
        }
    });

    $scope.$on('$destroy', langDownloaded);

    function metaData() {
        ngMeta.setTitle($rootScope.listOfKeys.otherProfile);
        ngMeta.setTag('description',$rootScope.listOfKeys.otherProfileDescription);
    }

    if($rootScope.userLogged != undefined){
        UserDetailsService.getUserDetails($routeParams.username,$routeParams.lang)
            .then(function (result) {
                   $scope.userResearched=result.data.user;
                   graphResultAfterFinishedATraining($scope.userResearched.statistics)
                }, function (err) {

                });
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
            if(args){
              UserDetailsService.getUserDetails($routeParams.username,$routeParams.lang)
                  .then(function (result) {
                         $scope.userResearched=result.data.user;
                         graphResultAfterFinishedATraining($scope.userResearched.statistics)
                      }, function (err) {

                      });
            }
        });
        $scope.$on('$destroy', ist);
    }


    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            graphResultAfterFinishedATraining($scope.user.getStatistics());
        }
    });
    $scope.$on('$destroy', langDownloaded);


    function graphResultAfterFinishedATraining(statistics){
        var rightAnswers = 0;
        var totalAnswers = 0;
        statistics.forEach(function(elem) {
            rightAnswers = parseInt(rightAnswers) + parseInt(elem.correctAnswers);
            totalAnswers = parseInt(totalAnswers) + parseInt(elem.totalAnswers);

        });

        $scope.publicRightAnswers = rightAnswers;
        $scope.puclicTotalAnswers = totalAnswers;

        $scope.myChartDataDoughnut = [
            {
                value: rightAnswers,
                color: "#86FC72",
                label: $rootScope.listOfKeys.questionsRight
            },
            {
                value : totalAnswers - rightAnswers,
                color : "#F7464A",
                label: $rootScope.listOfKeys.questionsWrong
            }
        ];
        $scope.myChartOptionsDoughnut = {
            egmentShowStroke : false,
            animateScale : true
        };
    }
}
