/*******************************************************************************
* Name: QuizziPedia::Front-End::Controllers::;
* Description: ;
* Relations with other classes:
* +
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: _20160503;
* Update data: 03-05-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('TrainingController', TrainingController);

TrainingController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'TrainingModeModel'];
function TrainingController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, TrainingModeModel ) {

  /*Public variables on Scope*/
  $scope.iQ = false;
  $scope.questionNumberOnTraining = 1;
  $scope.numberOfQuestionsOnTraining = {
    num: 1
  };

  $scope.starTraining = function (argument, keywords) {
    if($scope.iQ) {
      $scope.numberOfQuestionsOnTraining = {
        num: 0
      };
    }
    console.log($scope.numberOfQuestionsOnTraining.num);
    $scope.training = new TrainingModeModel(argument, keywords, $scope.numberOfQuestionsOnTraining.num);
  };

  var keepOnMind = 0;
  $scope.setInfiniteQuestion = function(infiniteQuestion) {
    $scope.iQ=infiniteQuestion;
    if(infiniteQuestion) {
      keepOnMind = $scope.numberOfQuestionsOnTraining.num;
      $scope.numberOfQuestionsOnTraining.num = 0;
    }
    else {
      $scope.numberOfQuestionsOnTraining.num = keepOnMind;
    }
  }

  /*Scope functions*/
  /*Evet to check if a question is aswered*/
  $scope.newQuestion= function() {
    console.log("ci clicco");
    $rootScope.$emit("isItAnswered");
  };

  /*RootScope functions*/
  /*Event to go on during the training mode*/
  $rootScope.$on("doYouWannaGoOn", function(event, args) {
    console.log("Emesso");
      if(!args) {
        alert = $mdDialog.confirm()
            .title($rootScope.listOfKeys.attention)
            .content($rootScope.listOfKeys.areYouSureToGoOn)
            .ok($rootScope.listOfKeys.yesGoOn)
            .cancel($rootScope.listOfKeys.dontGoOn);
        $mdDialog
            .show( alert )
            .then(function() {
              if($scope.questionNumberOnTraining+1 > $scope.training.getNumberOfQuestions())
              {
                console.log("allenamento terminato");
              }
              else {
                $rootScope.$emit("loadNewQuestion");
                angular.element(".scrollable").scrollTop(0,0);
              }
              $scope.questionNumberOnTraining++;
            });
      }
      else {
        if($scope.questionNumberOnTraining+1 > $scope.training.getNumberOfQuestions())
        {
          console.log("allenamento terminato");
        }
        else {
          $rootScope.$emit("loadNewQuestion");
          angular.element(".scrollable").scrollTop(0,0);
        }
        $scope.questionNumberOnTraining++;
      }

  });


  /*Prove*/

  var self = this;

  self.readonly = false;
  self.selectedItem = null;
  self.searchText = null;
  self.querySearch = querySearch;
  self.vegetables = loadVegetables();
  self.selectedVegetables = [];
  $scope.numberChips = [];
  self.numberChips2 = [];
  self.numberBuffer = '';
  self.autocompleteDemoRequireMatch = false;
  self.transformChip = transformChip;

  /**
   * Return the proper object when the append is called.
   */
  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }

    // Otherwise, create a new one
    return { name: chip, type: 'new' }
  }

  /**
   * Search for vegetables.
   */
  function querySearch (query) {
    var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
    return results;
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(vegetable) {
      return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
          (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
    };

  }

  function loadVegetables() {
    var veggies = [
      {
        'name': 'Broccoli',
        'type': 'Brassica'
      },
      {
        'name': 'Cabbage',
        'type': 'Brassica'
      },
      {
        'name': 'Carrot',
        'type': 'Umbelliferous'
      },
      {
        'name': 'Lettuce',
        'type': 'Composite'
      },
      {
        'name': 'Spinach',
        'type': 'Goosefoot'
      }
    ];

    return veggies.map(function (veg) {
      veg._lowername = veg.name.toLowerCase();
      veg._lowertype = veg.type.toLowerCase();
      return veg;
    });
  }



};
