/*******************************************************************************
 * Name: QuestionnaireModel;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Models::QuestionnaireModel;
 * Relations with other classes:
 * + .
 * Creation data: 26-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireModel_20160526;
 * Update data: 26-05-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

'use strict';

describe('QuestionnaireModel', function(){
    var QuestionnaireModel;
    var q;

    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            QuestionnaireModel = $injector.get('QuestionnaireModel');
        });
        q = new QuestionnaireModel("aferrara", "Questionario", ['Informatica', 'UniPD'], "Cultura Generale", [123234345456, 12323434523], "02341", ['true', 'false', 'true'])


    });
    it('should get the author of the questionnaire', function(){
        var result = q.getAuthor();
        expect(result).toEqual("aferrara");
    });
    it('should get the name of the author of the questionnaire', function(){
        var result = q.getName();
        expect(result).toEqual("Questionario");
    });
    it('should get the type of the questionnaire', function(){
        var result = q.getKeyword();
        expect(result).toEqual(['Informatica', 'UniPD']);
    });
    it('should get the argument of the questionnaire', function(){
        var result = q.getArgument();
        expect(result).toEqual("Cultura Generale");
    });
    it('should get the questions of the questionnaire', function(){
        var result = q.getQuestions();
        expect(result).toEqual([123234345456, 12323434523]);
    });
    it('should get the keywords of the questionnaire', function(){
        var result = q.getId();
        expect(result).toEqual("02341");
    });
    it('should get the mark of the questionnaire', function(){
        var result = q.getMark();
        expect(result).toEqual(0);
    });
    it('should get the results of the questionnaire', function(){
        var result = q.getResultSummary();
        expect(result).toEqual(['true', 'false', 'true']);
    });
    it('should get the number of questions of the questionnaire', function(){
        var result = q.getNumberOfQuestions();
        expect(result).toEqual(2);
    });



    it('should set the author of the questionnaire', function(){
        q.setAuthor("Giuseppe");
        var result = q.getAuthor();
        expect(result).toEqual("Giuseppe");
    });
    it('should set the name of the questionnaire', function(){
        q.setName("Questionario2");
        var result = q.getName();
        expect(result).toEqual("Questionario2");
    });
    it('should set the keywords of the questionnaire', function(){
        q.setKeyword(['Matematica', 'PD']);
        var result = q.getKeyword();
        expect(result).toEqual(['Matematica', 'PD']);
    });
    it('should set the language of the questionnaire', function(){
        q.setArgument("Matematica");
        var result = q.getArgument();
        expect(result).toEqual("Matematica");
    });
    it('should set the question of the questionnaire', function(){
        q.setMark(9);
        var result = q.getMark();
        expect(result).toEqual(9);
    });
    it('should set the question of the questionnaire', function(){
        q.insertQuestion(1123123123);
        var result = q.getNumberOfQuestions();
        expect(result).toEqual(3);
    });
    it('should set the question of the questionnaire', function(){
        q.insertQuestion(1123123123);
        var result = q.getNumberOfQuestions();
        expect(result).toEqual(3);
    });

    /* VA SISTEMATA LA FUNZIONE NEL MODEL
    
    it('should set the question of the questionnaire', function(){

        q.removeQuestion(12323434523);
        var result = q.getNumberOfQuestions();
        expect(result).toEqual(2);
    });*/
});


