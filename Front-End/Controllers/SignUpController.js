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
* ID: SingUpController_20160502
* Update data: 02-05-2016
* Description: Aggiornamento finale funzione signUp, inserimento mdDialog
* Author: Alberto Ferrara
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
            if(user.password !== user.passwordCheck){
                alert = $mdDialog.alert()
                    .title("Errore Password")
                    .content('Le Password non corrispondono!')
                    .ok('Chiudi');
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            }
            else {
                AuthService.signUp(user.username, user.password, user.email, user.name, user.surname, $routeParams.lang)
                    .then(function (result) {
                        if (result.data.code == 3) {
                            alert = $mdDialog.alert()
                                .title('Ciao ' + user.name + " " + user.surname)
                                .content('La registrazione è avvenuta con successo!')
                                .ok('Chiudi');
                            $mdDialog
                                .show(alert)
                                .finally(function () {
                                    alert = undefined;
                                });
                            $location.path('/' + $routeParams.lang + '/login');
                        }
                    }, function (err) {
                        if (err.data.code == 2) {
                            alert = $mdDialog.alert()
                                .title("C'è stato un errore con la registrazione")
                                .content("L'username che hai usato esiste già!")
                                .ok('Chiudi');
                            $mdDialog
                                .show(alert)
                                .finally(function () {
                                    alert = undefined;
                                });
                        }
                        $rootScope.error = new ErrorInfoModel("3", "La registrazione non è andata a buon fine", "Registrazione non " +
                            "effettuata");
                    })
            }
        };


}