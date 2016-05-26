/*******************************************************************************
 * Name: TrainingModeModel;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Models::TrainingModeModel;
 * Relations with other classes:
 * + .
 * Creation data: 26-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TrainingModeModel_20160526;
 * Update data: 26-05-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

'use strict';

describe('TrainingModeModel', function(){
    var TrainingModeModel;
    var t;

    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            TrainingModeModel = $injector.get('TrainingModeModel');
        });
        t = new TrainingModeModel("Informatica", ["Programmazione"], 10)


    });
    it('should get the keywords of the training', function(){
        var result = t.getKeywords();
        expect(result).toEqual(["Programmazione"]);
    });
    it('should get the author of the training', function(){
        var result = t.getArgument();
        expect(result).toEqual("Informatica");
    });
    it('should get the number of questions of the training', function(){
        var result = t.getNumberOfQuestions();
        expect(result).toEqual(10);
    });
    it('should get the questions of the training', function(){
        t.setQuestions([Object, Object]);
        var result = t.getQuestions();
        expect(result).toEqual([Object, Object]);
    });
    it('should get the questions of the training', function(){
        t.setRightAnswer(3);
        var result = t.getRightAnswer();
        expect(result).toEqual(3);
    });




    it('should set the keywords of the training', function(){
        t.setKeywords(["Programmazione ad Oggetti"]);
        var result = t.getKeywords();
        expect(result).toEqual(["Programmazione ad Oggetti"]);
    });
    it('should set the Argument of the training', function(){
        t.setArgument("Matematica");
        var result = t.getArgument();
        expect(result).toEqual("Matematica");
    });
    it('should set the number of questions of the training', function(){
        t.setNumberOfQuestions(5);
        var result = t.getNumberOfQuestions();
        expect(result).toEqual(5);
    });
    it('should set the questions of the training', function(){
        t.setQuestions([Object, Object]);
        var result = t.getQuestions();
        expect(result).toEqual([Object, Object]);
    });
    it('should add a questions to the training', function(){
        t.addQuestion(Object);
        var result = t.getNumberOfQuestions();
        expect(result).toEqual(11);
    });
    it('should set the right answer of the training', function(){
        t.setRightAnswer(2);
        var result = t.getRightAnswer();
        expect(result).toEqual(2);
    });
    it('should add a right answer to the training', function(){
        var result = t.getRightAnswer()
        expect(result).toEqual([]);
    });

});


