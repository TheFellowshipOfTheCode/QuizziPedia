/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controller::ProfileManagementController;
 * Description: questa classe permette di gestire il prolo personale di un utente
 * Creation data: 25-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ProfileManagementController_20160525
 * Update data: 25-05-2016
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('ProfileManagementController', ProfileManagementController);

ProfileManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'UserDetailsService', 'UserDetailsModel'];

function ProfileManagementController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, UserDetailsService, UserDetailsModel) {
    if($rootScope.userLogged != undefined){
        $scope.user = $rootScope.userLogged;
        loadUserDetails();
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
            if(args){
                $scope.user = $rootScope.userLogged;
                loadUserDetails();
            }
        });
        $scope.$on('$destroy', ist);
    }

    function loadUserDetails() {
        $scope.userLog = {
            name: $scope.user.getName(),
            surname: $scope.user.getSurname(),
            email: $scope.user.getEmail(),
            password: '',
            passwordCheck: ''

        }
    }

    $scope.modify = function(userLog) {
        if(userLog.password !== userLog.passwordCheck){
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
            var pwd;
            if(userLog.password !== "") {
                pwd = userLog.password;
            }
            else {
                pwd = $scope.user.password;
            }
            user.setName(userLog.name);
            user.setSurname(userLog.surname);
            user.setEmail(userLog.email);
            UserDetailsService.modifyProfile(user.name, user.surname, user.email, pwd, lang)
                .then(function (result) {
                    if (result.status == "200") {
                        alert = $mdDialog.alert()
                            .title("Modifiche accettate")
                            .content("La modifica del profilo è andata a buon fine")
                            .ok('Chiudi');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        $location.path('/' + $routeParams.lang + '/userpage');
                    }
                }, function (err) {
                    if (err.data.code == 2) {
                        alert = $mdDialog.alert()
                            .title(err.data.title)
                            .content(err.data.message)
                            .ok('Chiudi');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                    }
                    if (err.data.code == 3) {
                        alert = $mdDialog.alert()
                            .title(err.data.title)
                            .content(err.data.message)
                            .ok('Chiudi');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                    }
                    if (err.data.code == 4) {
                        alert = $mdDialog.alert()
                            .title(err.data.title)
                            .content(err.data.message)
                            .ok('Chiudi');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                    }

                })
        }
    }

}

