/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::MenuBarDirective;
* Description: ;
* Relations with other classes:
* +
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MenuBarDirective_20160427
* Update data: 27-04-2016
* Description: Creata la direttiva;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.directive('menuBarDirective', function() {
 return {
   restrict: 'E',
   scope: {},
   templateUrl: 'Directives/MenuBarDirective.html'
 };
});
