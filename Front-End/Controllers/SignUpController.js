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
            password: ''
        };

        $scope.logIn = function() {
            $location.path('/'+$routeParams.lang+'/login');
        }

        $scope.signUp = function (user) {
            AuthService.signIn(user.name, user.surname, user.email, user.username, user.password)

                .success(function(result){
                    $rootScope.user = new UserDetailsModel(user.name, user.surname, user.email, user.username, user.password);
                    $location.path('/'+$routeParams.lang+'/login');
                })

                .error(function(response){
                    console.error('Error', response.status, response.data);
                    $rootScope.error = new ErrorInfoModel("3", "La registrazione non è andata a buon fine", "Registrazione non " +
                        "effettuata");

                })
        }
}