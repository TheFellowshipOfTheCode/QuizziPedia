var mongoose = require('mongoose');
var summarySchema = new mongoose.Schema({
    quiz: {
        type:ObjectId,
        ref:'Quiz'
    },
    givenAnswers:[{
        type: ObjectId,
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

module.exports = mongoose.model('Summaries', summarySchema);