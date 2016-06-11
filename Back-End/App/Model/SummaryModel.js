/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::SummaryModel;
 * Description: classe che modella i riepiloghi all'interno dell'applicazione;
 * Creation data: 02-05-2016;
 * Author: Mattia Varotto.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SummaryModel_20160504;
 * Update data: 04-05-2016;
 * Description: Creata classe e aggiunti metodi findSummary() e createSummary();
 * Autore: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
var mongoose = require('mongoose');
var Quiz=require('./QuizModel');
var Question=require ('./QuestionModel');

var summarySchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },
    givenAnswers:[{
        _id:false,
        question:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question'},
        isCorrected: Boolean
    }],
    date: {type: Date, default: Date.now},
    mark: Number
});

summarySchema.statics.findSummary=function(summaryId,callback){
    return this.findOne({'_id':summaryId},'quiz date mark').lean().exec(function(err,summary){
         Quiz.getQuiz2(summary.quiz, function(err,quiz){
             summary.author=quiz.author
             summary.title=quiz.title
             summary.topic=quiz.topic
             callback(null,summary)
         })
    });
}

summarySchema.statics.createSummary = function(quiz_id, answers, callback) {
    var new_summary = new this();
    new_summary.quiz = quiz_id;
    new_summary.givenAnswers = answers;
    var corrected = 0;
    new_summary.givenAnswers.forEach(function(answer) {
        if(answer.isCorrected)
            corrected++;
    });
    new_summary.mark = Math.round(corrected/new_summary.givenAnswers.length*100)/10;
    // creazione del nuovo summary
    return new_summary.save(callback);
}


module.exports = mongoose.model('Summaries', summarySchema);