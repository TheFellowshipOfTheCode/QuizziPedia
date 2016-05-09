/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::TopicModel;
 * Description: classe che modella gli argomenti all’interno delle domande;
 * Relations with other classes:
 * + IN	TopicController;
 * + OUT QuestionModel.
 * Creation data: 02-05-2016;
 * Author: Marco Prelaz.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160502;
 * Update data: 02-05-2016;
 * Description: Creata classe;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var mongoose = require('mongoose');
var Question = require('./QuestionModel');

var topicSchema = new mongoose.Schema({
    name: String,
    correctAnswers: Number,
    totalAnswers: Number,
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }]
});

topicSchema.methods.getNextQuestion=function(language, topic, keywords, levelUser, callback){
    var questions = this.model('Topic').findOne({'name': topic});
    return  questions.question.findOne({'language': language, 'keywords': keywords,'level': levelUser}, '_id makeWith language question', callback);
};

module.exports = mongoose.model('Topic', topicSchema);