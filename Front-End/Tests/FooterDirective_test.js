/*******************************************************************************
 * Name: FooterDirective_test;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Directives::FooterDirective;
 * Creation data: 01-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: FooterDirective_test_20160501;
 * Update data: 01-05-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

describe("FooterDirective's Unit test", function () {
    var $compile;
    var $scope;

    beforeEach(function(){
        module("QuizziPedia");
        module('templates');
        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    it('should create label with the correct string', inject(function() {
        var template = $compile("<footer-directive></footer-directive>")($scope);
        var contents = template.find('h4');
        $scope.listOfKeys={"footerDescription": "Quizzipedia è un applicativo web in grado di gestire questionari online"};
        $scope.$digest();
        var result = template.text();
        var check = false;
        var n = result.search($scope.listOfKeys.footerDescription);
        if(n != -1) {
            check = true;
        }
        expect(check).toBe(true);
    }));

});
