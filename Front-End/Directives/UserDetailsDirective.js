/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::UserDetailsDirective;
 * Description: rappresenta i dati di un utente;
 * Relations with other classes:
 * +
 * Creation data: 12-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserDetailsDirective_20160512
 * Update data: 12-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('userDetailsDirective', userDetailsDirective);

function userDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/UserDetailsDirective.html',
    };
    return directive;
}
