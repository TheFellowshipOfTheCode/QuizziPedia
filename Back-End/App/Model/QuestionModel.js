var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    makeWith: String,
    language: String,
    question: [{
        type: String,
        questionText: String,
        image: String,
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
        }],
        keywords: [String],
        level: Number,
        totalAnswers: Number,
        correctAnswers: Number
    }]
});

questionSchema.statics.getQuestion=function(questionId,callback) {
    return model('Question').findOne({'_id': {$in: questionId}}, callback);
}
questionSchema.statics.createQuestion=function(question, callback){
    var quest = new this();
    quest.makeWith=question.makeWith;
    quest.language=question.language;
    return quest.save(callback);
};

questionSchema.methods.getQuestion=function(questionId,callback){
    return Quiz.findOne({'_id':{$in:questionId}},callback);
};

module.exports = mongoose.model('Question', questionSchema);