/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::QuestionItemModel;
 * Description: rappresenta una domanda.
 *
 * Relations with other classes:
 * +
 *
 * Creation data: 03-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionItemModel_03052016
 * Update data: 03-05-2016
 * Description: Creato il model;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionItemModel', QuestionItemModel);

function QuestionItemModel() {

    var QuestionItemModel = function (id, author, madeWith, language, question) {
        var id_ = id;
        var author_ = author;
        var madeWith_ = madeWith;
        var language_ = language;
        var question_ = question;

        this.setAuthor = function (author) {
            author_ = author;
        };

        this.setMadeWith = function (madeWith) {
            madeWith_ = madeWith;
        };

        this.setLanguage = function (language) {
            language_ = language;
        };

        this.setQuestion = function (question) {
            question_ = question;
        };

        this.getId = function () {
            return id_;
        };
        this.getAuthor = function () {
            return author_;
        };

        this.getMadeWith = function () {
            return madeWith_;
        };

        this.getLanguage = function () {
            return language_ ;
        };

        this.getQuestion = function () {
            return question_;
        };

        this.compareAnswers = function(givenAnswers){

        };

        this.addPieceOfQuestion = function(pieceOfQuestion){

        };

        this.createQuestion = function(questionText, image, url){

        };
    }
    return QuestionItemModel;
}