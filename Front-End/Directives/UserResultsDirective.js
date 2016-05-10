/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::UserResultsDirective;
 * Description: rappresenta un utente ricercato;
 * Relations with other classes:
 * +
 * Creation data: 10-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserResultsDirective_20160510
 * Update data: 10-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('userResultsDirective', userResultsDirective);

function userResultsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/UserResultsDirective.html'
    };
    return directive;
}
