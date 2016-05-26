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
            email: $scope.user.getEmail()

        }
    }
}

