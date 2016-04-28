/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::QuestionnaireManagementBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il redirect alla pagina di gestione delle domande. Permette di effettuare
* il redirect alla pagina di gestione delle domande;
* Relations with other classes:
* + MenuBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: QuestionnaireManagementBarDirective_20160427;
* Update data: 27-04-2016;
* Description: Creata la classe e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.directive('questionnaireManagementBarDirective', function() {
 return {
   restrict: 'E',
   templateUrl: 'Directives/QuestionnaireManagementBarDirective.html'
 };
});
