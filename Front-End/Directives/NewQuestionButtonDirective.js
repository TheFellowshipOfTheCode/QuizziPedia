/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::NewQuestionButtonDirective;
 * Description: contiene i pulsanti per la creazione delle domande
 * Creation data: 04-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: NewQuestionQuestionDirective_20160504
 * Update data: 04-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('newQuestionButtonDirective', newQuestionButtonDirective);

function newQuestionButtonDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/NewQuestionButtonDirective.html'
    };
    return directive;
}
