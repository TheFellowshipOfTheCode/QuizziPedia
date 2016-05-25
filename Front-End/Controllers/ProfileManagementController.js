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

}

