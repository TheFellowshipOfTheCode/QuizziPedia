/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::QuestionItemModel;
 * Description: rappresenta una domanda.
 *
 * 
 * Creation data: 03-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionItemModel_05052016
 * Update data: 05-05-2016
 * Description: Ultimato il model con tutti i metodi setter e getter;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: QuestionItemModel_03052016
 * Update data: 03-05-2016
 * Description: Creato il model;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('QuestionItemModel', QuestionItemModel);

function QuestionItemModel() {

    var QuestionItemModel = function (id, author, madeWith, language, question,keywords, level) {
        var id_ = id;
        var author_ = author;
        var madeWith_ = madeWith;
        var language_ = language;
        var question_ = question;
        var keywords_ = keywords;
        var level_ = level;

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

        this.setKeywords = function (keywords) {
            keywords_ = keywords;
        };

        this.setLevel = function (level) {
            level_ = level;
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

        this.getKeywords = function () {
            return keywords;
        };

        this.getLevel = function () {
            return level_;
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
