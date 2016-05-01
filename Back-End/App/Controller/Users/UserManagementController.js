
var user = require('../../Model/UserModel');
var summary = require('../../Model/SummaryModel');
var quiz = require('../../Model/QuizModel');
var error = require('../../Model/ErrorModel');


exports.updateDataUser = function(req, res, next) {
    req.user.editUser(req.content,function(err){
        if (err) return res.status(500).json(error.findOne({code:700}));
        return res.send(200);
    })
};

exports.updatePasswordUser = function(req, res, next) {

};

exports.updateStatisticUser = function(req, res, next) {

};

exports.updateSummary = function(req, res, next) {

};

exports.deleteUser = function(req, res, next) {

};


exports.getInfo = function(req, res, next) {
    userId=req.params.userId.replace(':','');
    user.findOne({'_id':userId},'name surname userImg experienceLevel', function(err,info){
        if (err)
            return handleError(err);
        else
            return res.send(info);
    })
};

exports.getSummary= function(req, res, next) {
    summary.findOne({_id:req.param('summaryId')},'quiz givenAnswers data mark', function(summaryJson){
        var quizJson=summary.getQuiz(summaryJson.quiz)
        summaryJson.quizJson=quizJson;
        return res.send(summaryJson);
    })
};

exports.getSummaries = function(req, res, next) {
    req.user.getSummaries(function(error,summaries){
        if(err) return res.status(500).json(err.findOne({code:700}));
        var query=summary.find({'quiz':{$in:summaries.quizSummaries.quiz}});
        var query2=quiz.find({'_id':{$in:query.quiz}});
        var dataSummaries={
            id: query2._id,
            title: query2.title,
            date: query.date
        };
        return res.send(dataSummaries);
    });
};

exports.getUsers = function(req, res, next) {

};

exports.getStatistics = function(req, res, next) {

};