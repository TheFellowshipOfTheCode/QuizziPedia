/*******************************************************************************
 * Nome: QuizziPedia::Front-End::Controllers::AppController;
 * Description: questa classe permette di gestire la lingua dell'applicazione e
 * tiene aggiornate le direttive di BreadBarDirective, MenuBarDirective;
 * Creation data: 30-04-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AppController_20160502;
 * Update data: 02-05-2016;
 * Description: Scritta la gestione dell'autorizzazione dell'utente;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: AppController_20160430;
 * Update data: 30-04-2016;
 * Description: Scritta la classe;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('LangController', LangController);

LangController.$inject = ['$location', '$mdBottomSheet', 'LangService', '$rootScope', '$scope'];
function LangController ($location, $mdBottomSheet, LangService, $rootScope, $scope) {

  $scope.goToNewLang= goToNewLang;
  function goToNewLang(lang) {
      $mdBottomSheet.hide();
      $rootScope.isDownloading=true;
      LangService
        .getSlang(lang)
        .then(function(lang){
          //$rootScope.systemLang=lang[0].lang;
          $location.path("/"+lang[0].lang+"/home");
          $rootScope.isDownloading=false;
        });
      }



}
