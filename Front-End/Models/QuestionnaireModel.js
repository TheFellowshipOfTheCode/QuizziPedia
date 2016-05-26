/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models:QuestionnaireModel;
 * Description: model che rappresenta un questionario;
 *
 * 
 * Creation data: 02-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireModel_20160503;
 * Update data: 03-05-2016;
 * Description: inseriti i metodi addResult(), removeQuestion(), addQuestion(),
 * getNumberOfQuestions(), getNumberOfQuestions(), getResultSummary() e
 * getResultById();
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireModel_20160502;
 * Update data: 02-05-2016;
 * Description: inseriti i metodi setter e getter;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireModel_20160502;
 * Update data: 02-05-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionnaireModel', QuestionnaireModel);

function QuestionnaireModel() {

    var QuestionnaireModel = function (author, name, keyword, argument, questions, id, results) {
        var author_ = author;
        var name_ = name;
        var keyword_ = keyword;
        var argument_ = argument;
        var questions_ = questions;
        var id_ = id;
        var results_ = results;
        var numOfRightAnswer = 0;
        var mark_ = 0;

        this.setAuthor = function (author) {
            author_ = author;
        };

        this.setName = function (name) {
            name_ = name;
        };

        this.setKeyword = function (keyword) {
            keyword_ = keyword;
        };

        this.setArgument = function (argument) {
            argument_ = argument;
        };


        this.setId = function (id) {
            id_ = id;
        };

        this.setMark = function (mark) {
            mark_ = mark;
        };

        this.getAuthor = function () {
            return author_;
        };

        this.getName = function () {
            return name_;
        };

        this.getKeyword = function () {
            return keyword_;
        };

        this.getArgument = function () {
            return argument_;
        };

        this.getId = function () {
            return id_;
        };

        this.getQuestions = function () {
            return questions;
        };

        this.getResult = function () {
          return numOfRightAnswer;
        };

        this.getMark = function () {
            return mark_;
        };

        this.getResultById = function (id) {
          var obj = results.filter(function ( obj ) {
            return obj.question._id == id;
          })[0];
          if(obj) {
            return obj.isCorrected;
          }
          else {
            return false;
          }
        };

        this.getResultSummary = function () {
          return results_;
        };

        this.getNumberOfQuestions = function () {
            return questions_.length;
        };

        this.insertQuestion = function(question) {
            questions.push(question);
        };

        this.addResult = function(id, res){
          results.push({"question": {"_id":id }, "isCorrected" : res});
          if(res) {
            numOfRightAnswer++;
          }
        };

        this.removeQuestion = function(id) {
          // da cambiare
            qLength = questions.length;
            for(var i = 0; i < qLength; i++) {
                if(questions[i].id === id) {
                    delete questions[i];
                }
            }
        };
    }
    return QuestionnaireModel;
}
