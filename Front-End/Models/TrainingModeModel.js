/*******************************************************************************
* Name: QuizziPedia::Front-End::Models::TrainingModeModel;
* Description: rappresenta un allenamento.
 *
 *
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
 *-------------------------------------------------------------------------------
 * ID: TrainingModeModel_20160503;
 * Update data: 03-05-2016;
 * Description: Inseriti i metodi setter e getter;
 * Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: TrainingModeModel_20160503;
* Update data: 03-05-2016;
* Description: Creato il file;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.factory('TrainingModeModel', TrainingModeModel);

function TrainingModeModel() {
  //constructor
  var TrainingModeModel = function (argument, keywords, numberOfQuestions)
  {

    // private variables
    var argument_ = argument;
    var keywords_ = keywords;
    var numberOfQuestions_ = numberOfQuestions;
    var rightAnswer_ = [];
    var numOfRightAnswer = 0;
    var questions_ = [];

    // public functions
    this.setKeywords = function (keywords) {
        keywords_ = keywords;
    };

    this.setArgument = function (argument) {
        argument_ = argument;
    };

    this.setNumberOfQuestions = function (numberOfQuestions) {
        numberOfQuestions_ = numberOfQuestions;
    };

    this.setQuestions = function (questions) {
        questions_ = questions;
    };

    this.setRightAnswer = function (rightAnswer) {
        rightAnswer_=rightAnswer;
    };

    this.getKeywords = function () {
        return keywords_;
    };

    this.getArgument = function () {
        return argument;
    };

    this.getNumberOfQuestions = function () {
        return numberOfQuestions_ ;
    };

    this.getNumberOfQuestionsAnswered = function () {
        return questions_.length;
    };

    this.getQuestions = function () {
        return questions_;
    };

    this.getRightAnswer = function () {
        return rightAnswer_;
    };

    this.getResult = function () {
      return numOfRightAnswer;
    };

    this.addQuestion = function(question){
      questions_.push(question);
    };

    this.addResult = function(result){
      if(result) {
        numOfRightAnswer++;
      }
    };

    this.removeQuestion = function(question){

    };

    this.addKeyword = function(key){

    };

    this.removeKeyword = function(key){

    };

  }
  return TrainingModeModel;
}
