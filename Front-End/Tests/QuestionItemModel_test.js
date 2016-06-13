/*******************************************************************************
 * Name: QuestionItemModel;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Models::QuestionItemModel;
 * Relations with other classes:
 * + .
 * Creation data: 26-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: QuestionItemModel_20160526;
 * Update data: 26-05-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

'use strict';

describe('QuestionItemModel', function(){
    var QuestionItemModel;
    var q;

    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            QuestionItemModel = $injector.get('QuestionItemModel');
        });
        q = new QuestionItemModel("01", "Alberto", "QML", "it", "Object" ,['Informatica', 'UniPD'], 500)
    });
    it('should get the id of the question', function(){
        var result = q.getId();
        expect(result).toEqual("01");
    });
    it('should get the name of the author of the question', function(){
        var result = q.getAuthor();
        expect(result).toEqual("Alberto");
    });
    it('should get the type of the question', function(){
        var result = q.getMadeWith();
        expect(result).toEqual("QML");
    });
    it('should get the lang of the question', function(){
        var result = q.getLanguage();
        expect(result).toEqual("it");
    });
    it('should get the content of the question', function(){
        var result = q.getQuestion();
        expect(result).toEqual("Object");
    });
    it('should get the keywords of the question', function(){
        var result = q.getKeywords();
        expect(result).toEqual(['Informatica', 'UniPD']);
    });
    it('should get the level of the question', function(){
        var result = q.getLevel();
        expect(result).toEqual(500);
    });
    it('should set the author of the question', function(){
        q.setAuthor("Giuseppe");
        var result = q.getAuthor();
        expect(result).toEqual("Giuseppe");
    });
    it('should set the type of the question', function(){
        q.setMadeWith("wizard");
        var result = q.getMadeWith();
        expect(result).toEqual("wizard");
    });
    it('should set the language of the question', function(){
        q.setLanguage("en");
        var result = q.getLanguage();
        expect(result).toEqual("en");
    });
    it('should set the question of the question', function(){
        q.setQuestion("Objects");
        var result = q.getQuestion();
        expect(result).toEqual("Objects");
    });
   
});


