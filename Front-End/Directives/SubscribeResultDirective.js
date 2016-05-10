/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::SubscribeResultDirective;
 * Description: rappresenta un questionario ricercato;
 * Relations with other classes:
 * +
 * Creation data: 10-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SubscribeResultDirective_20160510
 * Update data: 10-05-2016
 * Description: Creata la classe e scritto il file js;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('subscribeResultDirective', subscribeResultDirective);

function subscribeResultDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/SubscribeResultDirective.html'
    };
    return directive;
}
