/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::LoginBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il redirect alla pagina di login. Permette di effettuare il redirect alla
* pagina di login;
* Relations with other classes:
* + MenuBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LoginBarDirective_20160427
* Update data: 27-04-2016
* Description: Creata la classe e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('loginBarDirective', loginBarDirective);

function loginBarDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'Directives/LoginBarDirective.html'
    };
    return directive;
}
