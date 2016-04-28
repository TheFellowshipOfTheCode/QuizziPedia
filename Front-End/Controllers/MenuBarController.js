/*******************************************************************************
* Name: QuizziPedia::Front-End::Controllers::MenuBarController;
* Description: questa classe permette di gestire il menù fisso per ogni pagina;
* Fornisce le funzionalità per aggiornare, a seconda della pagina, il contenuto
* del menù;
* Relations with other classes:
* + AuthService;
* + MenuBarModel.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MenuBarController_20160427;
* Update data: 27-04-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.controller('MenuBarController', ['$scope','$timeout','$mdSidenav','$log', function($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $scope.listOfKeys= {
      "logIn": "Login",
      "signUp": "Signup",
      "logOut": "Logout",
      "profileManagement": "Gestione profilo",
      "questionsManagement": "Gestione delle domande",
      "questionnaireManagement": "Gestione dei questionari"
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  }]);
