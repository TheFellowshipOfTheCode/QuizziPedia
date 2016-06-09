/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controller::ProfileManagementController;
 * Description: questa classe permette di gestire il prolo personale di un utente
 * Creation data: 25-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * ID: ProfileManagementController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 * ID: ProfileManagementController_20160525
 * Update data: 25-05-2016
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('ProfileManagementController', ProfileManagementController);

ProfileManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'UserDetailsService', 'AuthService', 'UserDetailsModel', 'MenuBarModel', 'ngMeta'];

function ProfileManagementController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, UserDetailsService, AuthService, UserDetailsModel, MenuBarModel, ngMeta) {
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
        ngMeta.setTitle($rootScope.listOfKeys.profileManagement);
        ngMeta.setTag('description',$rootScope.listOfKeys.profileManagementDescription);
    }

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
            privilege: $scope.user.getPrivilege(),
            name: $scope.user.getName(),
            surname: $scope.user.getSurname(),
            email: $scope.user.getEmail(),
            image: $scope.user.getUserImg(),
            password: '',
            passwordCheck: ''

        }
    }

    $scope.deleteAccount = function() {
                AuthService.logout($rootScope.userLogged.getUsername());
                delete $rootScope.userLogged;
                $location.path('/'+$routeParams.lang+'/home');
                $rootScope.directivesChoose= MenuBarModel.getDirectives(location,"");
        UserDetailsService.deleteAccount($routeParams.lang)
            .then(function (result) {
                if (result.status == "200") {
                    alert = $mdDialog.alert()
                        .title($rootScope.listOfKeys.doneDelete)
                        .content($rootScope.listOfKeys.userDeleted)
                        .ok($rootScope.listOfKeys.closeIt);
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    $location.path('/' + $routeParams.lang + '/home');
                }
            }, function (err) {
                if (err.data.code == 2 || err.data.code == 3 || err.data.code == 4) {
                    alert = $mdDialog.alert()
                        .title(err.data.title)
                        .content(err.data.message)
                        .ok($rootScope.listOfKeys.closeIt);
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                }
            });
    }

    $scope.uploadImage = function(image){
        var data={image:image,type:"userImg"}
        UserDetailsService.uploadImage(data)
            .success(function(uploadResponse){
            })
            .error(function(error){
            })
    };

    $scope.changeAccount = function() {
        if($scope.user.getPrivilege() === 'normal') {
            $scope.user.setPrivilege('pro');
            $scope.userLog.privilege = 'pro';
        }
        else {
            $scope.user.setPrivilege('normal');
            $scope.userLog.privilege = 'normal';
        }
        UserDetailsService.changeAccount($routeParams.lang)
            .then(function (result) {
                if (result.status == "200") {
                    alert = $mdDialog.alert()
                        .title($rootScope.listOfKeys.okChangePrivilegeTitle)
                        .content($rootScope.listOfKeys.okChangePrivilege)
                        .ok($rootScope.listOfKeys.closeIt);
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    $location.path('/' + $routeParams.lang + '/profilemanagement');
                    $rootScope.directivesChoose= MenuBarModel.getDirectives(location,$rootScope.userLogged.getPrivilege());
                }
            }, function (err) {
                  if (err.data.code == 2 || err.data.code == 3 || err.data.code == 4) {
                      alert = $mdDialog.alert()
                          .title(err.data.title)
                          .content(err.data.message)
                          .ok($rootScope.listOfKeys.closeIt);
                      $mdDialog
                          .show(alert)
                          .finally(function () {
                              alert = undefined;
                          });
                      $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                  }
            })
    }

    $scope.modify = function(userLog) {
        if(userLog.password !== userLog.passwordCheck){
            alert = $mdDialog.alert()
                .title($rootScope.listOfKeys.errorPasswordProfileManagement)
                .content($rootScope.listOfKeys.passwordsAreDifferent)
                .ok($rootScope.listOfKeys.closeIt);
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });
        }
        else {
            if (userLog.password !== "") {
                $scope.user.setName(userLog.name);
                $scope.user.setSurname(userLog.surname);
                $scope.user.setEmail(userLog.email);
                $scope.user.setUserImg(userLog.image)
                var nome = $scope.user.getName();
                var cognome = $scope.user.getSurname();
                var email = $scope.user.getEmail();
                var image = $scope.user.getUserImg();

                UserDetailsService.modifyProfilePwd(nome, cognome, email,image, userLog.password, $routeParams.lang)
                    .then(function (result) {
                        if (result.status == "200") {
                            alert = $mdDialog.alert()
                                .title($rootScope.listOfKeys.okChangesTitle)
                                .content($rootScope.listOfKeys.okChanges)
                                .ok($rootScope.listOfKeys.closeIt);
                            $mdDialog
                                .show(alert)
                                .finally(function () {
                                    alert = undefined;
                                });
                            $location.path('/' + $routeParams.lang + '/profilemanagement');
                        }
                    }, function (err) {
                      if (err.data.code == 2 || err.data.code == 3 || err.data.code == 4) {
                          alert = $mdDialog.alert()
                              .title(err.data.title)
                              .content(err.data.message)
                              .ok($rootScope.listOfKeys.closeIt);
                          $mdDialog
                              .show(alert)
                              .finally(function () {
                                  alert = undefined;
                              });
                          $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);
                      }

                    })
            }
            else {
                $scope.user.setName(userLog.name);
                $scope.user.setSurname(userLog.surname);
                $scope.user.setEmail(userLog.email);
                $scope.user.setUserImg(userLog.image)
                var nome = $scope.user.getName();
                var cognome = $scope.user.getSurname();
                var email = $scope.user.getEmail();
                var image = $scope.user.getUserImg();
                UserDetailsService.modifyProfile(nome, cognome, email, image, $routeParams.lang)
                    .then(function (result) {
                        if (result.status == "200") {
                            alert = $mdDialog.alert()
                                .title($rootScope.listOfKeys.okChangesTitle)
                                .content($rootScope.listOfKeys.okChanges)
                                .ok($rootScope.listOfKeys.closeIt);
                            $mdDialog
                                .show(alert)
                                .finally(function () {
                                    alert = undefined;
                                });
                            $location.path('/' + $routeParams.lang + '/profilemanagement');
                        }
                    }, function (err) {
                      if (err.data.code == 2 || err.data.code == 3 || err.data.code == 4) {
                          alert = $mdDialog.alert()
                              .title(err.data.title)
                              .content(err.data.message)
                              .ok($rootScope.listOfKeys.closeIt);
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
}
