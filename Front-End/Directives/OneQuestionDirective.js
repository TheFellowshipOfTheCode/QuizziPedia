/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::OneQuestionDirective;
 * Description: rappresenta una domanda creata dall'utente;
 * Relations with other classes:
 * +
 * Creation data: 04-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: OneQuestionDirective_20160504
 * Update data: 04-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('oneQuestionDirective', oneQuestionDirective);

function oneQuestionDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/OneQuestionDirective.html'
    };
    return directive;
}
