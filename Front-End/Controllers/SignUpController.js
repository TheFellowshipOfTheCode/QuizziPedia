/*******************************************************************************
* Name: QuizziPedia::Front-End::Views::SingUpController
* Description:
* Relations with other classes:
* + SignUpView
* + AuthService
* Creation data: 27-04-2016
* Author: Simone Magagna
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SingUpController_20160427
* Update data: 27-04-2016
* Description: creazione
* Author: Simone Magagna
*-------------------------------------------------------------------------------
*******************************************************************************/
app.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$rootScope', '$routeParams', 'AuthService', '$location', '$mdDialog', '$cookies', '$timeout','$mdSidenav', 'UserDetailsModel', 'ErrorInfoModel', 'MenuBarModel'];

function SignUpController ($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, $cookies, $timeout, $mdSidenav, UserDetailsModel, ErrorInfoModel, MenuBarModel) {
        $scope.user = {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            passwordCheck: ''
        };

        $scope.logIn = function() {
            $location.path('/'+$routeParams.lang+'/login');
        };

        $scope.signUp = function(user) {
            console.log(user);
            if(user.password !== user.passwordCheck) return;
            
            AuthService.signUp(user.username, user.password, user.email, user.name, user.surname, $routeParams.lang)
                .then(function(result){
                    $rootScope.user = new UserDetailsModel(result.data.user.name, result.data.user.surname, result.data.user.email, "", result.data.user.username, "" , result.data.user.experienceLevel, result.data.user.privilege, result.data.user._id);
                    console.log($rootScope.user);
                    $location.path('/'+$routeParams.lang+'/login');
                })
                ,function (err){
                    $rootScope.error = new ErrorInfoModel("3", "La registrazione non è andata a buon fine", "Registrazione non " +
                        "effettuata");
                }
        };
}