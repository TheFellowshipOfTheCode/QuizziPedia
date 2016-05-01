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

SignUpController.$inject = ['$scope','$timeout','$mdSidenav', '$mdDialog', '$location', '$routeParams', 'MenuBarModel', 'AuthService'];

function SignUpController ($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, $cookies, UserDetailsModel, ErrorInfoModel) {
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
        }

        $scope.signup = function (user) {
            if(user.password !== user.passwordCheck) return;
            AuthService.signUp(user.username, user.password, user.email, nuser.name, user.surname)

                .success(function(result){
                    $rootScope.user = new UserDetailsModel(result.user.name, result.user.surname, result.user.email, result.user.username, result.user.password);
                    $location.path('/'+$routeParams.lang+'/login');
                })

                .error(function(response){
                    console.error('Error', response.status, response.data);
                    $rootScope.error = new ErrorInfoModel("3", "La registrazione non è andata a buon fine", "Registrazione non " +
                        "effettuata");

                })
        }
}