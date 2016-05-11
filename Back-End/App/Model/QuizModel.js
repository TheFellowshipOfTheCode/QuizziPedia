var mongoose = require('mongoose');
var Question = require('./QuestionModel');
var User = require('./UserModel');


var quizSchema = new mongoose.Schema({
    title: { type : String},
    topic: String,
    keywords: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    activeUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    active: {type:Boolean, default:false},
    correctAnswers: { type: Number, default: 0 },

});



quizSchema.statics.createQuiz = function(info, callback) {
    console.log(info)
    var new_quiz = new this(info);
    return new_quiz.save(callback);
}

quizSchema.statics.editQuiz = function(info, callback) {

}

quizSchema.statics.addUser = function(userId, callback) {
    params.quiz.registeredUsers.push(userId);
    params.quiz.save(callback);
}

quizSchema.statics.removeUser = function(userId, callback) {
    params.quiz.registeredUsers.remove(userId);
    params.quiz.save(callback);
}

quizSchema.statics.addActiveUser = function(userId, callback) {
    params.quiz.activeUsers.push(userId);
    params.quiz.save(callback);
}

quizSchema.statics.getPersonalQuizzes = function(author, callback) {
    return this.find({ author: author}, callback);
}

quizSchema.statics.searchQuiz=function(tosearch, callback){
    return this.find({'title':  new RegExp(tosearch, "i") },'title', callback);
};

quizSchema.statics.getQuiz=function(quizId,callback){
    return this.findOne({'_id':quizId},'title keywords topic questions active',function (err, quiz){
        if (quiz.active){
            var questions_quiz=[];
            quiz.questions.forEach(function(elem) {
                    Question.getQuestion(elem,function(err,question){
                        questions_quiz.push(question);
                        if(questions_quiz.length==quiz.questions.length){
                            quiz.questions=questions_quiz
                            return callback(err,quiz)
                        }
                    })
            })
        }
        else
            return callback(new Error("Questionario non abilitato"))
    })
};


var Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;





