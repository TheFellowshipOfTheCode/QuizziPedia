/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::MenuBarDirective;
* Description: rappresenta il menù, presente in ogni pagina dell’applicazione,
* generato in base agli oggetti passati nello $scope isolato. Fornisce un
* pulsante per ogni oggetto ricevuto come parametro, ogni pulsante viene
* rappresentato con un’icona e con un testo. Al click di un pulsante viene
* invocata la funzione ad esso associata;
* Relations with other classes:
* + Index;
* + SearchDirective;
* + LoginDirective;
* + SignUpBarDirective;
* + UserBarDirective;
* + ProfileManagementBarDirective;
* + QuestionsManagementBarDirective;
* + LogoutBarDirective;
* + QuestionnarireManagementBarDirective.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MenuBarDirective_20160427
* Update data: 27-04-2016
* Description: Creata la classe e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('menuBarDirective', menuBarDirective);

function menuBarDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'Directives/MenuBarDirective.html'
    };
    return directive;
}
