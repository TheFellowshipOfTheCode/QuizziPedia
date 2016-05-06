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
    level: {type:Number, default: 500},
    totalAnswers: {type:Number, default: 0},
    correctAnswers: {type:Number, default: 0},
});

questionSchema.statics.createQuestion=function(author,question, callback){
    question.author = author
    var new_question = new this(question);
    return new_question.save(callback);
};

questionSchema.statics.getQuestion=function(questionId,callback) {
    return this.findOne({'_id': questionId},'makeWith language -question._id', callback);
}

questionSchema.statics.getQuestions=function(author, callback){
    return this.find({'author': author},'_id makeWith language question.type question.questionText', callback);
};

questionSchema.statics.editQuestion=function(question,callback){
    return this.findOneAndUpdate({'_id' : question._id}, question, callback)
};

questionSchema.statics.updateLevel=function(questionId,userLevel,isCorrected,callback){
    this.findOne({_id:questionId}, function(err,question){
        console.log(userLevel)
        if(err){
            return next(err);
        }
        var oldDifficult = question.level;
        var differentLevel = oldDifficult - userLevel;
        // caso in cui la domanda sia piÃ¹ difficile dell'abilitÃ  dell'utente:
        if(differentLevel <= 100 && differentLevel > 0){
            var scarto = oldDifficult - userLevel;
            if(isCorrected == true){
                if(scarto > 90){
                    question.level = oldDifficult + 11;
                }else if(scarto > 80){
                    question.level = oldDifficult + 10;
                }else if(scarto > 70){
                    question.level = oldDifficult + 9;
                }else if(scarto > 60){
                    question.level = oldDifficult + 8;
                }else if(scarto > 50){
                    question.level = oldDifficult + 7;
                }else if(scarto > 40){
                    question.level = oldDifficult + 6;
                }else if(scarto > 30){
                    question.level = oldDifficult + 5;
                }else if(scarto > 20){
                    question.level = oldDifficult + 4;
                }else if(scarto > 10){
                    question.level = oldDifficult + 3;
                }else if(scarto > 0){
                    question.level = oldDifficult + 2;
                }
            } else{
                if(scarto > 90){
                    question.level = oldDifficult - 2;
                }else if(scarto > 80){
                    question.level = oldDifficult - 3;
                }else if(scarto > 70){
                    question.level = oldDifficult - 4;
                }else if(scarto > 60){
                    question.level = oldDifficult - 5;
                }else if(scarto > 50){
                    question.level = oldDifficult - 6;
                }else if(scarto > 40){
                    question.level = oldDifficult - 7;
                }else if(scarto > 30){
                    question.level = oldDifficult - 8;
                }else if(scarto > 20){
                    question.level = oldDifficult - 9;
                }else if(scarto > 10){
                    question.level = oldDifficult - 10;
                }else if(scarto > 0){
                    question.level = oldDifficult - 11;
                }
            }
        }
        else{
            // caso in cui la domanda sia più facile dell'abilità  dell'utente
            var scarto = userLevel - oldDifficult;
            console.log(scarto)
            if(isCorrected == true){
                if(scarto > 90){
                    question.level = oldDifficult - 2;
                }else if(scarto > 80){
                    question.level = oldDifficult - 3;
                }else if(scarto > 70){
                    question.level = oldDifficult - 4;
                }else if(scarto > 60){
                    question.level = oldDifficult - 5;
                }else if(scarto > 50){
                    question.level = oldDifficult - 6;
                }else if(scarto > 40){
                    question.level = oldDifficult - 7;
                }else if(scarto > 30){
                    question.level = oldDifficult - 8;
                }else if(scarto > 20){
                    question.level = oldDifficult - 9;
                }else if(scarto > 10){
                    question.level = oldDifficult - 10;
                }else if(scarto > 0){
                    question.level = oldDifficult - 11;
                }else if(scarto == 0){
                    question.level = oldDifficult - 1;
                }
            } else{
                if(scarto > 90){
                    question.level = oldDifficult + 11;
                }else if(scarto > 80){
                    question.level = oldDifficult + 10;
                }else if(scarto > 70){
                    question.level = oldDifficult + 9;
                }else if(scarto > 60){
                    question.level = oldDifficult + 8;
                }else if(scarto > 50){
                    question.level = oldDifficult + 7;
                }else if(scarto > 40){
                    question.level = oldDifficult + 6;
                }else if(scarto > 30){
                    question.level = oldDifficult + 5;
                }else if(scarto > 20){
                    question.level = oldDifficult + 4;
                }else if(scarto > 10){
                    question.level = oldDifficult + 3;
                }else if(scarto > 0){
                    question.level = oldDifficult + 2;
                }else if(scarto == 0){
                    question.level = oldDifficult + 1;
                }
            }
        }
        // controllo che il livello non sia oltre i limiti
        if(question.level > 1000){
            question.level = 1000;
        }
        else if(question.level < 0){
            question.level = 0;
        }
        return question.save(callback)
    })

}

questionSchema.statics.addKeyword=function(questionId,keyword,callback){

}

questionSchema.statics.addCorrect=function(questionId,callback){
    this.findOneAndUpdate({_id: questionId},{ $inc: { correctAnswers: 1 }},callback)

}

questionSchema.statics.addTotal=function(questionId,callback){ 
    this.findOneAndUpdate({_id: questionId},{ $inc: { totalAnswers: 1 }},callback)
}


module.exports = mongoose.model('Question', questionSchema);