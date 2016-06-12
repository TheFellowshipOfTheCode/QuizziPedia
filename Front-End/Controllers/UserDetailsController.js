/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::UserDetailsController;
 * Description: questa classe permette di recuperare i dati dell'utente;
 *
 *
 * Creation data: 12-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserDetailsController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 * ID: UserDetailsController_20160513;
 * Update data: 13-05-2016;
 * Description: Inseriti i metodi loadDoneQuizzes(), loadAbilitatedQuizzes(),
 * graphResultAfterFinishedATraining();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: UserDetailsController_20160512;
 * Update data: 12-05-2016;
 * Description: Creata e iniziata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('UserDetailsController', UserDetailsController);

UserDetailsController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'UserDetailsService', 'QuizService','ngMeta'];

function UserDetailsController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, UserDetailsService, QuizService, ngMeta) {
    $scope.quizzes = undefined;
    $scope.subscribedQuizzes = undefined;

    if($rootScope.userLogged != undefined){
        $scope.user = $rootScope.userLogged;
        loadDoneQuizzes();
        loadAbilitatedQuizzes();
        loadApprovedQuizzes();
        graphResultAfterFinishedATraining($scope.user.getStatistics());
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
            if(args){
                $scope.user = $rootScope.userLogged;
                loadDoneQuizzes();
                loadAbilitatedQuizzes();
                loadApprovedQuizzes();
            }
        });
        $scope.$on('$destroy', ist);
    }

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
        ngMeta.setTitle($rootScope.listOfKeys.titleLangUserView);
        ngMeta.setTag('description',$rootScope.listOfKeys.titleLangUserViewDescription);
    }

    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            graphResultAfterFinishedATraining($scope.user.getStatistics());
        }
    });
    $scope.$on('$destroy', langDownloaded);

    $scope.goToQuiz = function (id) {
        $location.path("/"+$routeParams.lang+"/quiz/"+id)
    }

    function loadDoneQuizzes() {
        QuizService.getDoneQuestionnaire($routeParams.lang)
            .then(function (result) {
                if(result.data.length > 0)
                    $scope.quizzes = result.data;
                else{
                    $scope.quizzes=[];
                }
            }, function (err) {
              $scope.quizzes=[];
            })
    }

    function loadAbilitatedQuizzes() {
        QuizService.getSubscribedQuestionnaire($routeParams.lang)
            .then(function (result) {
                if(result.data.length >0){
                    $scope.subscribedQuizzes = result.data;}
                else{
                    $scope.subscribedQuizzes = [];
                }

            }, function (err) {
                $scope.subscribedQuizzes = [];
            });

    }

    function loadApprovedQuizzes() {
        QuizService.getApprovedQuestionnaire($routeParams.lang)
            .then(function (result) {
                if(result.data.length >0){
                    $scope.approvedQuizzes = result.data;}
                else{
                    $scope.approvedQuizzes = [];
                }

            }, function (err) {
              $scope.approvedQuizzes = [];
            });

    }

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
