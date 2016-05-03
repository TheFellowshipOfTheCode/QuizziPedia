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

topicSchema.statics.getNextQuestion=function(language, topic, keywords, levelUser, callback){
    //var questions = this.findOne({'name': topic});
    return  Question.findOne({'language': language, 'keywords': {$in:keywords}, 'level': levelUser}, 'language question keywords level', callback);
};

module.exports = mongoose.model('Topic', topicSchema);