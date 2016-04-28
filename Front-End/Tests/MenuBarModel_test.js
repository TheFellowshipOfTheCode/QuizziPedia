/*******************************************************************************
* Name: MenuBarModelTest;
* Description: test di unità per la classe
* QuizziPedia::Front-End::Models::MenuBarModel;
* Relations with other classes:
* + MenuBarModel.
* Creation data: 28-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MenuBarModel_20160428;
* Update data: 28-04-2016;
* Description: Scritto il test, superato;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

'use strict';

describe('MenuBarModelTest', function(){
    var MenuBarModel;
    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            MenuBarModel = $injector.get('MenuBarModel');
        });
    });
    it('should get the directives for a not auth user', function(){
        var result = MenuBarModel.getDirectives("/ita/login","noAuth");
        expect(result).toEqual({ "loginBarDirective": true, "signUpBarDirective": true  });
    });
    it('should get the directives for a normal user on home', function(){
        var result = MenuBarModel.getDirectives("/ita/home","normal");
        expect(result).toEqual({ "logoutBarDirective": true, "questionsManagementBarDirective": true, "profileManagementBarDirective": true, "userBarDirective": true  });
    });
    it('should get the directives for a pro user on home', function(){
        var result = MenuBarModel.getDirectives("/ita/home","pro");
        expect(result).toEqual({ "logoutBarDirective": true, "questionsManagementBarDirective": true, "profileManagementBarDirective": true, "userBarDirective": true, "questionnaireManagementBarDirective": true  });
    });
    it('should get the directives for a normal user in a different page from home', function(){
        var result = MenuBarModel.getDirectives("/ita/otherPage","normal");
        expect(result).toEqual({ "logoutBarDirective": true, "questionsManagementBarDirective": true, "profileManagementBarDirective": true, "userBarDirective": true, "searchDirective": true  });
    });
    it('should get the directives for a pro user in a different page from home', function(){
        var result = MenuBarModel.getDirectives("/ita/otherPage","pro");
        expect(result).toEqual({ "logoutBarDirective": true, "questionsManagementBarDirective": true, "profileManagementBarDirective": true, "userBarDirective": true, "searchDirective": true, "questionnaireManagementBarDirective": true  });
    });
});
