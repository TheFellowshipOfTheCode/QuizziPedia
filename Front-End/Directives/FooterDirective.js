/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::FooterDirective;
 * Description: directive contenente i componenti grafici del footer dell'applicazione;
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: FooterDirective_20160428
 * Update data: 28-04-2016
 * Description: Creata la direttiva;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('footerDirective', footerDirective);

function footerDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/FooterDirective.html'
    };
    return directive;
}