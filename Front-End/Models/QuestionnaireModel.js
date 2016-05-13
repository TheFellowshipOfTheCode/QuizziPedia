/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models:QuestionnaireModel;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionnaireModel_20160504;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionnaireModel', QuestionnaireModel);

function QuestionnaireModel() {

    var QuestionnaireModel = function (author, name, keyword, argument, questions, id) {
        var author = author;
        var name_ = name;
        var keyword_ = keyword;
        var argument_ = argument;
        var questions_ = questions;
        var id_ = id;
        var results = [];
        var numOfRightAnswer = 0;

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

        this.getResultById = function (id) {
          console.log(id);
          var obj = results.filter(function ( obj ) {
            console.log(obj);
            return obj.question._id == id;
          })[0];
          console.log(obj);
          return obj.isCorrected;
        };

        this.getResultSummary = function () {
          return results;
        };

        this.getNumberOfQuestions = function () {
            return questions_.length;
        };

        this.insertQuestion = function(question) {
            questions.push(question);
        };

        this.addResult = function(id, res){
          results.push({"question": {"_id":id }, "isCorrected" : res});
          console.log(results);
          if(res) {
            console.log("entro");
            numOfRightAnswer++;
          }
          console.log(numOfRightAnswer);
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
