/*******************************************************************************
* Name: QuizziPedia::Front-End::Directives::SearchDirective;
* Description: directiveG che permette di effettuare la ricerca di utenti e
* questionari. Permette all’utente di effettuare ricerche, è formata da:
* + Barra di ricerca;
* + Pulsante per effettuare la ricerca.
* Relations with other classes:
* + HomeView;
* + MenuBarDirective;
* + LangModel.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: SearchDirective_20160427
* Update data: 27-04-2016
* Description: Creata la direttiva e scritto il file js;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.directive('searchDirective', function() {
 return {
   restrict: 'E',
   scope: {},
   templateUrl: 'Directives/SearchDirective.html'
 };
});
