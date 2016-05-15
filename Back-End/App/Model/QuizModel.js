/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::QuizModel;
 * Description: classe che modella i questionari all'interno dell'applicazione;
 * Creation data: 02-05-2016;
 * Author: Mattia Varotto.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizController_20160502;
 * Update data: 05-05-2016;
 * Description: aggiunti metodi della classe e aggiornato lo schema;
 * Autore: Mattia Varotto.
 *-------------------------------------------------------------------------------
 * ID: QuizController_20160502;
 * Update data: 02-05-2016;
 * Description: Creata classe;
 * Autore: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

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

quizSchema.statics.subscribeUser = function(quizId,userId, callback) {
    this.update({_id:quizId},{$push:{registeredUsers:userId}},callback);
}

quizSchema.statics.removeUser = function(userId, callback) {
    params.quiz.registeredUsers.remove(userId);
    params.quiz.save(callback);
}

quizSchema.statics.addActiveUser = function(quizId,userId, callback) {
    this.findOne({_id:quizId},function(err,quiz){
        quiz.activeUsers.push(userId)
        var index =  quiz.registeredUsers.indexOf(userId);
        if (index > -1)
            quiz.registeredUsers.splice(index, 1);
        quiz.save(callback);
    })
}

quizSchema.statics.getQuizSubscribe=function(userId, callback) {
    return this.find({registeredUsers: userId},'title topic author').lean().exec(function(err,quiz){
        if (quiz.length>0)
        quiz.forEach(function(elem,index){
            User.getUser(elem.author,function(err,author){
                if(author) {
                    quiz[index].author=author.username
                }
                if (index+1==quiz.length){
                    callback(null,quiz)
                }
            })
        })
        else
            callback(new Error("Errore l'utente non è iscritto d alcun questionario"));
    });
}

quizSchema.statics.getPersonalQuizzes = function(author, callback) {
    return this.find({ author: author}, callback);
}

quizSchema.statics.searchQuiz=function(tosearch, callback){
    return this.find({'title':  new RegExp(tosearch, "i") },'title', callback);
};

quizSchema.statics.getQuizSubscribers=function(quizId, callback){
    return this.findOne({'_id': quizId },'registeredUsers', function(err, users){
         users.registeredUsers.forEach(function(user,index){
            User.getUser(user,function(err,subscriber) {
                users.registeredUsers[index]={_id :subscriber._id, name:subscriber.name, username:subscriber.username}
                if (index+1 == users.registeredUsers.length)
                    callback(null, users.registeredUsers)
            });
         })
    })
};

quizSchema.statics.getQuiz=function(quizId,userId,callback){
    return this.findOne({'_id':quizId,'activeUsers':userId},'title keywords topic questions active',function (err, quiz){
        if (quiz)
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
                callback(new Error("Questionario non abilitato"))
        else
            callback(new Error("Utente non autorizzato"))
    })
};


quizSchema.statics.getQuiz2=function(quizId,callback) {
    return this.findOne({'_id': quizId}, 'title author', callback)
}

var Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
