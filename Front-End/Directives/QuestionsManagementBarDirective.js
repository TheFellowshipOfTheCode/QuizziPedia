/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::QuestionsManagementBarDirective;
* Description: directive contenente il componente che permette di effettuare
* il redirect alla pagina di gestione dei questionari; Permette di effettuare
* il redirect alla pagina di gestione dei questionari;
* Relations with other classes:
* + MenuBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: QuestionsManagementBarDirective_20160427;
* Update data: 27-04-2016;
* Description: Creata la direttiva e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('questionsManagementBarDirective', questionsManagementBarDirective);

function questionsManagementBarDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'Directives/QuestionsManagementBarDirective.html'
    };
    return directive;
}
