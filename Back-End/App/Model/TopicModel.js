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

topicSchema.statics.getNextQuestion=function(topic, alreadyAnswered, language, keywords, skillLevel, callback){
    var randomNumber=1+Math.round(Math.random()*100);
    if(randomNumber>=1 && randomNumber<=50){
        var randomNumber2=1+Math.round(Math.random()*100);
        if(randomNumber2>=1 && randomNumber2<=70)
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel, $lte: skillLevel+20}}, '_id language question keywords level makeWith author', callback);
        else
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-20, $lte: skillLevel-1}}, '_id language question keywords level makeWith author', callback);
    }
    else if(randomNumber>=51 && randomNumber<=75)
        return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel+21, $lte: skillLevel+60}}, '_id language question keywords level makeWith author', callback);
    else if(randomNumber>=76 && randomNumber<=85)
        return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel+61, $lte: skillLevel+100}}, '_id language question keywords level makeWith author', callback);
    else if(randomNumber>=86 && randomNumber<=95)
        return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-60, $lte: skillLevel-21}}, '_id language question keywords level makeWith author', callback);
    else
        return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-100, $lte: skillLevel-61}}, '_id language question keywords level makeWith author', callback);
};

topicSchema.statics.getTopics=function(callback){
    return this.find({},'name',callback);
};

topicSchema.statics.getKeywords=function(topic, callback){
    return  Question.find({'_id':{$in:topic.question}},'keywords',callback);
};

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

module.exports = mongoose.model('Topic', topicSchema);