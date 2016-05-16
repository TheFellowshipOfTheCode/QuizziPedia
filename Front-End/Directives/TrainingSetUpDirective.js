/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::TrainingSetUpDirective;
* Description: direttiva per il set up dell'allenamento;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: TrainingSetUpDirective_20160503;
* Update data: 03-05-2016;
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('trainingSetUpDirective', TrainingSetUpDirective);

function TrainingSetUpDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'Directives/TrainingSetUpDirective.html'
  };
  return directive;
};
