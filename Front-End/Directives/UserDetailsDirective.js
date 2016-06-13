/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::UserDetailsDirective;
 * Description: directive che rappresenta i dati di un utente;
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

app.directive('userDetailsDirective', userDetailsDirective);

function userDetailsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/UserDetailsDirective.html',
    };
    return directive;
}
