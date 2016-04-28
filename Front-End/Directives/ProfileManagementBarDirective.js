/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::ProfileManagementBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il redirect alla pagina di gestione del profilo. Permette di effettuare il
* redirect alla pagina di gestione del profilo;
* Relations with other classes:
* + MenuBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: ProfileManagementBarDirective_20160427;
* Update data: 27-04-2016;
* Description: Creata la classe e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.directive('profileManagementBarDirective', function() {
 return {
   restrict: 'E',
   templateUrl: 'Directives/ProfileManagementBarDirective.html'
 };
});
