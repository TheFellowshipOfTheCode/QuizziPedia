var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var questionSchema = new mongoose.Schema({
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    makeWith: {type: String},
    language: {type: String},
    question: [{
        type: {type: String},
        questionText: {type: String},
        image: {type: String},
        answers: [{
            text: {type: String},
            url: {type: String},
            attributesForTForMultiple: {
                isItRight: {type: Boolean}
            },
            attributesForSorting: {
                position: {type: Number}
            },
            attributesForLinking: {
                text1: {type: String},
                text2: {type: String},
                url1: {type: String},
                url2: {type: String}
            },
            attributesForClickableArea: {
                x: {type: Number},
                y: {type: Number}
            },
            attributesForEmptySpaces: {
                wordNumber: {type: Number}
            }
        }]
    }],
    keywords: [String],
    level: {type:Number, default: 500},
    totalAnswers: {type:Number, default: 0},
    correctAnswers: {type:Number, default: 0}
});

questionSchema.plugin(random);

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