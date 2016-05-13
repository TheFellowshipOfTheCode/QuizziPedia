var mongoose = require('mongoose');
var Question = require('./QuestionModel');
var User = require('./UserModel');


var quizSchema = new mongoose.Schema({
    title: { type : String},
    topic: String,
    keywords: [String],
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
    var new_quiz = new this(info);
    return new_quiz.save(callback);
}

quizSchema.statics.editQuiz = function(info, callback) {

}

quizSchema.statics.addUser = function(quizId,userId, callback) {
    this.update({_id:quizId},{$push:{registeredUsers:userId}},callback);
}

quizSchema.statics.removeUser = function(userId, callback) {
    params.quiz.registeredUsers.remove(userId);
    params.quiz.save(callback);
}

quizSchema.statics.addActiveUser = function(userId, callback) {
    params.quiz.activeUsers.push(userId);
    params.quiz.save(callback);
}

quizSchema.statics.getQuizSubscribe=function(userId, callback) {
    return this.find({registeredUsers: userId},'title topic author',function(err,quiz){
        var author_array=[]
        var i=quiz.length;
        quiz.forEach(function(elem){
            User.getUser(elem.author,function(err,author){
                author_array.push(author.name)
            })
            i--;
            if (i==0){
                quiz.author=author_array;
                callback(null,quiz)
            }
        })
    });
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
                            var qR = questions_quiz.reverse();
                            quiz.questions=qR;
                            return callback(err,quiz);
                        }
                    })
            });

        }
        else
            return callback(new Error("Questionario non abilitato"))
    })
};


var Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
