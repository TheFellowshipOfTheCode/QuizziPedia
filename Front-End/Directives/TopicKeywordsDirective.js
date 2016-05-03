/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::TopicKeywordsDirective;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicKeywordsDirective_20160503;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('TopicKeywordsDirective', TopicKeywordsDirective);

function TopicKeywordsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: 'Directives/TopicKeywordsDirective.html'
    };
    return directive;
}

