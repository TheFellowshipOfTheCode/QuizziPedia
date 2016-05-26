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
 *-------------------------------------------------------------------------------
 * ID: HomeView_20160509;
 * Update data: 09-05-2016;
 * Description: Completata la classe con la funzione search();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
* ID: HomeView_20160425;
* Update data: 25-04-2016;
* Description: Scritta la classe e il metodo trainingMode();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('HomeController', HomeController);

HomeController.$inject = ['$scope','$location','$routeParams','ngMeta'];
function HomeController ($scope, $location, $routeParams,ngMeta) {
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
    ngMeta.setTitle($rootScope.listOfKeys.home);
    ngMeta.setTag('description',$rootScope.listOfKeys.homeDescription);
  }
  $scope.trainingMode = function(){
    $location.path("/"+$routeParams.lang+"/training");
  };
  
  $scope.search = function(){
    var tosearch = document.getElementById("lookingfor").value;
    if(tosearch){
        $location.path("/" + $routeParams.lang + "/search/" + tosearch);
    }
  }
}
