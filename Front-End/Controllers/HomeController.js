/*******************************************************************************
* Nome: QuizziPedia::Front-End::Controllers::HomeController;
* Description: questa classe permette di gestire la home page. Fornisce tutte
* le informazioni da mostrare nella homepage;
* Creation data: 30-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: HomeView_20160430;
* Update data: 30-04-2016;
* Description: Scritta la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('HomeController', HomeController);

HomeController.$inject = ['$scope','$location','$routeParams'];
function HomeController ($scope, $location, $routeParams) {
  $scope.trainingMode = function(){
    $location.path("/"+$routeParams.lang+"/training");
  };
  
  $scope.search = function(){
    var tosearch = document.getElementById("lookingfor").value;
    $location.path("/" + $routeParams.lang + "/search/" + tosearch);
  }
}
