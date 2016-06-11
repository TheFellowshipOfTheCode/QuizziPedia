/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::QMLTutorialDirective;
 * Creation data: 31-05-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 * ID: QMLTutorialDirective_20160531
 * Update data: 31-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('qmlTutorialDirective', QMLTutorialDirective);

function QMLTutorialDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/QMLTutorialDirective.html',
    };
    return directive;
}
