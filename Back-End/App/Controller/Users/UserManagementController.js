
var user = require('../../Model/UserModel');
var summary = require('../../Model/SummaryModel');
var quiz = require('../../Model/QuizModel');

exports.updateDataUser = function(req, res, next) {

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
    user.findOne({'username':req.user.username},function(datauser){
        var info={
            username: datauser.username,
            name:datauser.name,
            surname: datauser.surname,
            email: datauser.email,
            userImg: datauser.userImg,
            experienceLevel: datauser.experienceLevel
        };
        return res.send(info);
    })
};

exports.getSummary= function(req, res, next) {
    summary.findOne({'_id':req.param('summaryId')}, function(dataSummary){
        var summary={
            quiz: dataSummary.quiz,
            givenAnswers: dataSummary.givenAnswers,
            data: dataSummary.data,
            mark: dataSummary.mark
        };
        return res.send(summary);
    })
};

exports.getSummaries = function(req, res, next) {
    req.user.getSummaries(function(error,summaries){
        if(err) return res.status(500).json(err.findOne({code:700}));
        var query=summary.find({'quiz':{$in:summaries.quizSummaries.quiz}});
        var query2=quiz.find({'_id':{$in:query.quiz}});
        var dataSummaries={
            id: quey2._id,
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