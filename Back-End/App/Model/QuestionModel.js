var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    makeWith: String,
    language: String,
    question: [{
        type: {type: String},
        questionText: {type: String},
        image: {type: String},
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
    }],
    keywords: [String],
    level: Number,
    totalAnswers: Number,
    correctAnswers: Number
});

questionSchema.statics.getQuestion=function(questionId,callback) {
    return this.findOne({'_id': {$in: questionId}}, callback);
}

questionSchema.statics.createQuestion=function(author,question, callback){
    question.author = author
    var new_question = new this(question);
    /*new_question.author=author;
    new_question.makeWith=question.makeWith;
    new_question.language=question.language;
    new_question.question.answers = [{}];
    for (var i in question.question) {
        var questionarray = question.question[i];
        new_question.question.push({
            type: questionarray['type'],
            questionText: questionarray['questionText'],
            image: questionarray['image']
        });
        console.log(new_question)
        for (var j in questionarray['answers']) {
         var answersarray = questionarray['answers'][j]
         new_question.question.answers.push({
             text: answersarray['text'],
             url: answersarray['url'],
             attributesForTForMultiple: {isItRight: answersarray.attributesForTForMultiple['isItRight'] || ""},
             //attributesForSorting: {position: (answersarray.attributesForSorting['position'] || "")},
             attributesForLinking: {
                 text1: answersarray.attributesForLinking['text1'],
                 text2: answersarray.attributesForLinking['text2'],
                 url1: answersarray.attributesForLinking['url1'],
                 url2: answersarray.attributesForLinking['url2'],
             },
             attributesForClickableArea: {
                 x: answersarray.attributesForClickableArea['x'],
                 y: answersarray.attributesForClickableArea['y'],
             },
             attributesForEmptySpaces: {
                 wordNumber: answersarray.attributesForEmptySpaces['wordNumber'],
             },
         })
            new_question.question.answers.push(answersarray);
         }
        //console.log(new_question.question)



        //
        //  console.log(new_question.question)
        //}
    }*/
    new_question.save(callback);
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