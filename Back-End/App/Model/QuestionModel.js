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
    return this.findOne({'_id': {$in: questionId}}, callback);
}

questionSchema.statics.createQuestion=function(author,question, callback){
    var quest = new this();
    quest.author=author;
    quest.makeWith=question.makeWith;
    quest.language=question.language;
    quest.question=question.question;
    return quest.save(callback);
};

questionSchema.statics.editQuestion=function(question,callback){
    return this.findOneAndUpdate(question._id, question, callback)
}

questionSchema.statics.updateLevel=function(questionId,userLevel,isCorrected){

}

questionSchema.statics.addKeyword=function(questionId,keyword,callback){

}

questionSchema.statics.addCorrect=function(questionId){
    this.findOne({_id: questionId}, function(err, question){
        if (err) { return next(err); }
        question.correctAnswers += 1;
        return question.save()
    });
}

questionSchema.statics.addTotal=function(questionId){
    this.findOne({_id: questionId}, function(err, question){
        if (err) { return next(err); }
        question.totalAnswers += 1;
        return question.save()
    });
}

questionSchema.methods.getQuestion=function(questionId,callback){
    return Quiz.findOne({'_id':{$in:questionId}},callback);
};

module.exports = mongoose.model('Question', questionSchema);