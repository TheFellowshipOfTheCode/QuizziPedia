/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::FooterDirective;
 * Description: directive contenente i componenti grafici del footer dell'applicazione;
 *
 * Relations with other classes:
 * + Index
 *
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
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