/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::TopicModel;
 * Description: classe che modella gli argomenti all’interno delle domande;
 * Creation data: 02-05-2016;
 * Author: Marco Prelaz.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160502;
 * Update data: 06-05-2016;
 * Description: Aggiunta le funzioni addCorrect e addTotal;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160502;
 * Update data: 05-05-2016;
 * Description:  getNextQuestion è stata perfezionata;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160502;
 * Update data: 04-05-2016;
 * Description: Aggiunta la funzione getKeywords;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160503;
 * Update data: 03-05-2016;
 * Description: Aggiunto un primo prototipo della funzione getNextQuestion;
 * Autore: Marco Prelaz.
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
            if(keywords.length==0)
                return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel, $lte: skillLevel+20}}, '_id language question keywords level makeWith author', callback);
            else
                return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel, $lte: skillLevel+20}}, '_id language question keywords level makeWith author', callback);
        else
            if(keywords.length==0)
                return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel-20, $lte: skillLevel-1}}, '_id language question keywords level makeWith author', callback);
            else
                return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-20, $lte: skillLevel-1}}, '_id language question keywords level makeWith author', callback);
    }
    else if(randomNumber>=51 && randomNumber<=75)
        if(keywords.length==0)
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel+21, $lte: skillLevel+60}}, '_id language question keywords level makeWith author', callback);
        else
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel+21, $lte: skillLevel+60}}, '_id language question keywords level makeWith author', callback);
    else if(randomNumber>=76 && randomNumber<=85)
        if(keywords.length==0)
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel+61, $lte: skillLevel+100}}, '_id language question keywords level makeWith author', callback);
        else
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel+61, $lte: skillLevel+100}}, '_id language question keywords level makeWith author', callback);
    else if(randomNumber>=86 && randomNumber<=95)
        if(keywords.length==0)
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel-60, $lte: skillLevel-21}}, '_id language question keywords level makeWith author', callback);
        else
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-60, $lte: skillLevel-21}}, '_id language question keywords level makeWith author', callback);
    else
        if(keywords.length==0)
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'level': {$gte: skillLevel-100, $lte: skillLevel-61}}, '_id language question keywords level makeWith author', callback);
        else
            return  Question.findOneRandom({'_id':{$in:topic.question, $nin:alreadyAnswered},'language': language, 'keywords': {$in:keywords}, 'level': {$gte: skillLevel-100, $lte: skillLevel-61}}, '_id language question keywords level makeWith author', callback);
};

topicSchema.statics.getQuestions=function(topic, callback){
    return  Question.find({'_id':{$in:topic.question}},'keywords',callback);
};

topicSchema.statics.getTopicQuestions = function(topic, keywords, lang, callback) {
   if (topic=='null')
        return this.find({}, 'question', function(err, questionsID) {
            if (err) return callback;
            else return Question.getAllQuestions(questionsID, keywords, lang, callback);
        });
   else{
        return this.findOne({name: topic}, 'question', function(err, questionsID) {
            if (err) return callback;
            else return Question.getAllQuestions(questionsID, keywords, lang, callback);
        });
   }
};

topicSchema.statics.getTopic= function(lang, callback) {
    return this.find({}, 'name', callback);
};

topicSchema.statics.getTopicQuestion= function(questionId, callback) {
    return this.findOne({question:questionId}, 'name', callback);
};

topicSchema.statics.addCorrect = function(topic, callback) {
    this.findOne({'name': topic}, function(err, topic) {
        if (err) {
            return next(err);
        }
        topic.correctAnswers++;
        console.log(topic)
        return topic.save(callback)
    })
};

topicSchema.statics.addTotal=function(topic, callback) {
    this.findOne({'name': topic }, function(err, topic) {
        if (err) {
            return next(err);
        }
        console.log(topic);
        topic.totalAnswers++;
        return topic.save(callback)
    })
};


module.exports = mongoose.model('Topic', topicSchema);