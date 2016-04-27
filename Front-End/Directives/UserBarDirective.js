/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::UserBarDirective;
* Description: ;
* Relations with other classes:
* +
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: UserBarDirectiveUserBarDirective_20160427
* Update data: 27-04-2016
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.directive('userBarDirective', function() {
 return {
   restrict: 'E',
   scope: {},
   templateUrl: 'Directives/UserBarDirective.html'
 };
});
