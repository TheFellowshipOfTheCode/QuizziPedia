/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::UserDetailsDirective;
 * Description: directive per la visualizzazione delle statistiche di un utente;
 * Creation data: 12-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: UserDetailsDirective_20160512
 * Update data: 12-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('statisticsDirective', StatisticsDirective);

function StatisticsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/StatisticsDirective.html'
      };
    return directive;
  }
