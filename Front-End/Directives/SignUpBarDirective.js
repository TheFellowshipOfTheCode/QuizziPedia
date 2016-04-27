/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SignUpBarDirective;
* Description: ;
* Relations with other classes:
* +
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SignUpBarDirective_20160427
* Update data: 27-04-2016
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.directive('signUpBarDirective', function() {
 return {
   restrict: 'E',
   scope: {},
   templateUrl: 'Directives/SignUpBarDirective.html'
 };
});
