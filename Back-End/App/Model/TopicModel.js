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
    name: {type: String},
    correctAnswers: {type: Number},
    totalAnswers: {type: Number},
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }]
});
topicSchema.statics.findTopicByName=function(topic, callback){
    return this.findOne({'name': topic}, callback);
};

topicSchema.statics.getNextQuestion=function(topic, language, keywords, levelUser, callback){
    return  Question.findOneRandom({'_id':{$in:topic.question},'language': language, 'keywords': {$in:keywords}, 'level': levelUser}, '_id language question keywords level', callback);
};

module.exports = mongoose.model('Topic', topicSchema);