/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SignUpBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il redirect alla pagina di registrazione. Permette di effettuare il redirect
* alla pagina di registrazione;
* Relations with other classes:
* + MenuBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SignUpBarDirective_20160427;
* Update data: 27-04-2016;
* Description: Creata la classe e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('signUpBarDirective', function() {
 return {
   restrict: 'E',
   templateUrl: 'Directives/SignUpBarDirective.html'
 };
});
