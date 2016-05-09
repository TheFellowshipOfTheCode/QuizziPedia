var mongoose = require('mongoose');
var Quiz=require('./QuizModel');
var Question=require ('./QuestionModel');

var summarySchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },
    givenAnswers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question',
        answers: [{
            text: String,
            url: String,
            attributesForTForMultiple: {
                isItRight: Boolean
            },
            attributesForSorting: {
                position: Number
            },
            attributesForLinking: {
                text1: String,
                text2: String,
                url1: String,
                url2: String
            },
            attributesForClickableArea: {
                x: Number,
                y: Number
            },
            attributesForEmptySpaces: {
                wordNumber: Number
            }
        }]
    }],
    date: Date,
    mark: Number
});

summarySchema.statics.findSummary=function(summaryId,callback){
    return this.findOne({'_id':summaryId}, function(err,summary){
         Quiz.getQuiz(summary.quiz,callback)
    });
}


module.exports = mongoose.model('Summaries', summarySchema);