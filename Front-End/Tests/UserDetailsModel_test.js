/*******************************************************************************
 * Name: UserDetailsModelTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Models::UserDetailsModel;
 * Relations with other classes:
 * + .
 * Creation data: 29-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: UserDetailsModel_20160429;
 * Update data: 29-04-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

'use strict';

describe('UserDetailsModelTest', function(){
    var UserDetailsModel;
    var user;

    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            UserDetailsModel = $injector.get('UserDetailsModel');
        });
        user = new UserDetailsModel("Alberto", "Ferrara", "albertoferrara92@gmail.com", "path", "aferrara", "stats" , "500", "pro", "01");
    });
    it('should get the name of the user', function(){
        var result = user.getName();
        expect(result).toEqual("Alberto");
    });
    it('should get the surname of the user', function(){
        var result = user.getSurname();
        expect(result).toEqual("Ferrara");
    });
    it('should get the email of the user', function(){
        var result = user.getEmail();
        expect(result).toEqual("albertoferrara92@gmail.com");
    });
    it('should get the path of the userImage', function(){
        var result = user.getUserImg();
        expect(result).toEqual("path");
    });
    it('should get the username of the user', function(){
        var result = user.getUsername();
        expect(result).toEqual("aferrara");
    });
    it('should get the statistics of the user', function(){
        var result = user.getStatistics();
        expect(result).toEqual("stats");
    });
    it('should get the level of the user', function(){
        var result = user.getLevel();
        expect(result).toEqual("500");
    });
    it('should get the privilege of the user', function(){
        var result = user.getPrivilege();
        expect(result).toEqual("pro");
    });
    it('should get the id of the user', function(){
        var result = user.getId();
        expect(result).toEqual("01");
    });
    it('should set the name of the user', function(){
        user.setName("Giuseppe");
        var result = user.getName();
        expect(result).toEqual("Giuseppe");
    });
    it('should set the surname of the user', function(){
        user.setSurname("Alba");
        var result = user.getSurname();
        expect(result).toEqual("Alba");
    });
    it('should set the email of the user', function(){
        user.setEmail("giuseppealba@gmail.com");
        var result = user.getEmail();
        expect(result).toEqual("giuseppealba@gmail.com");
    });
    it('should set the path of the userImage', function(){
        user.setUserImg("pathImg");
        var result = user.getUserImg();
        expect(result).toEqual("pathImg");
    });
    it('should set the username of the user', function(){
        user.setUsername("galba");
        var result = user.getUsername();
        expect(result).toEqual("galba");
    });
    it('should set the statistics of the user', function(){
        user.setStatistics("statistics");
        var result = user.getStatistics();
        expect(result).toEqual("statistics");
    });
    it('should set the level of the user', function(){
        user.setLevel("600");
        var result = user.getLevel();
        expect(result).toEqual("600");
    });
    it('should set the privilege of the user', function(){
        user.setPrivilege("no auth");
        var result = user.getPrivilege();
        expect(result).toEqual("no auth");
    });
    it('should set the id of the user', function(){
        user.setId("02");
        var result = user.getId();
        expect(result).toEqual("02");
    });


});


