/*******************************************************************************
 * Name: QuizziPedia::Front-End::Directives::TopicKeywordsDirective;
 * Description: direttiva per impostare l'argomento e le parole chiave;
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicKeywordsDirective_20160503;
 * Update data: 03-05-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.directive('topicKeywordsDirective', topicKeywordsDirective);

function topicKeywordsDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: '/Directives/TopicKeywordsDirective.html'
    };
    return directive;
}

