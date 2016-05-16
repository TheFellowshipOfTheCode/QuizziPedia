/*******************************************************************************
 * Nome: QuizziPedia::Front-End::Controllers::LangController;
 * Description: questa classe permette di gestire la lingua dell'applicazione e
 * tiene aggiornate le direttive di BreadBarDirective, MenuBarDirective;
 *
 * 
 * Creation data: 26-04-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LangController_20160502;
 * Update data: 02-05-2016;
 * Description: Scritta la funzione goToNewLang();
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: LangController_20160426;
 * Update data: 26-04-2016;
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
