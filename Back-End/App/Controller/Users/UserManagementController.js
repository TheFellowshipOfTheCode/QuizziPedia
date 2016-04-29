
var user = require('../../Model/UserModel');

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
    user.findOne({username:req.user.username},function(err,datauser){
        if (err)
            next(err)

        var info={
            username: datauser.username,
            name:datauser.name,
            surname: datauser.surname,
            email: datauser.email,
            userImg: datauser.userImg,
            experienceLevel: datauser.experienceLevel
        }
        res.send(info);
    })
};

exports.getSummary= function(req, res, next) {

};

exports.getSummaries = function(req, res, next) {

};

exports.getUsers = function(req, res, next) {

};

exports.getStatistics = function(req, res, next) {

};