/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::QuestionnaireDoneDetailsDirective;
 * Description: rappresenta i questionari svolti da un utente;
 * Relations with other classes:
 * +
 * Creation data: 12-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160512
 * Update data: 12-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('questionnaireDoneDetailsDirective', questionnaireDoneDetailsDirective);

function questionnaireDoneDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/questionnaireDoneDetailsDirective.html',
    };
    return directive;
}
