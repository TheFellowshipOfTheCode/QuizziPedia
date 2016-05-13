/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::QuestionnaireDetailsDirective;
 * Description: rappresenta i questionari abilitati per un utente;
 * Relations with other classes:
 * +
 * Creation data: 13-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireDoneDetailsDirective_20160513
 * Update data: 13-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('questionnaireDetailsDirective', questionnaireDetailsDirective);

function questionnaireDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/questionnaireDetailsDirective.html',
    };
    return directive;
}
