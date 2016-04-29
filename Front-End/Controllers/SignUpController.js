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

function SignUpController ($scope, $timeout, $mdSidenav, $mdDialog, $location, $routeParams, MenuBarModel, AuthService) {
        $scope.user = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        };

        $scope.signUp = function (user) {
        }
    }