/*******************************************************************************
* Nome: QuizziPedia::Front-End::Controllers::HomeController;
* Description: questa classe permette di gestire la home page. Fornisce tutte
* le informazioni da mostrare nella homepage;
*
*
* Creation data: 25-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* ID: HomeController_20160526;
* Update data: 26-05-2016;
* Description: Aggiornato controller
* Author: Franco Berton.
*-------------------------------------------------------------------------------
* ID: HomeController_20160509;
* Update data: 09-05-2016;
* Description: Completata la classe con la funzione search();
* Author: Alberto Ferrara.
*-------------------------------------------------------------------------------
* ID: HomeController_20160425;
* Update data: 25-04-2016;
* Description: Scritta la classe e il metodo trainingMode();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope','$scope','$location','$routeParams','ngMeta'];
function HomeController ($rootScope,$scope, $location, $routeParams,ngMeta) {

  $scope.trainingMode = function(){
    $location.path("/"+$routeParams.lang+"/training");
  };

  $scope.search = function(){
    var tosearch = document.getElementById("lookingfor").value;
    if(tosearch){
        if($routeParams.lang!=undefined) {
          $location.path("/" + $routeParams.lang + "/search/" + tosearch);
        }
        else {
          $location.path("/it/search/" + tosearch);
        }
    }
  }
}
