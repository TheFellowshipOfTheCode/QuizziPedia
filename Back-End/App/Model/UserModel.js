/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::UserModel;
 * Description: classe che modella la creazione e la gestione dei dati utente;
 * Creation data: 01-05-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160501;
 * Update data: 01-05-2016;
 * Description: Creata classe e aggiunto lo userSchema;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160503;
 * Update data: 07-05-2016;
 * Description: Aggiunta la funzione updateTopicLevel;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: TopicModel_20160503;
 * Update data: 08-05-2016;
 * Description: Aggiunta le funzioni addCorrect e addTotal;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
//var Summaries = require('./SummaryModel');

var userSchema = new mongoose.Schema(
    {
        name: String,
        surname: String,
        email: String,
        userImg: String,
        username: String,
        password: String,
        statistics: [{
            _id:false,
            topicName: String,
            topicLevel: {type:Number, default:500},
            correctAnswers: {type:Number, default:0},
            totalAnswers: {type:Number, default:0}
        }],
        experienceLevel: {type:Number, default:1},
        quizSummaries:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Summaries'
        }],
        privilege: String
    }
);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.editUser=function(content,callback,errback){
    return User.update({username: this.username},content, callback);
};

userSchema.methods.editPassword=function(password,errback){

};

userSchema.methods.setImg=function(image,errback){

};

userSchema.statics.getUser=function(userId,callback){
    return this.findOne({'_id':userId}, callback)
};

userSchema.methods.upLevel=function(callback){

};

userSchema.methods.deleteUser=function(callback){
    return this.model('User').findByIdAndRemove(this._id , callback);
};

userSchema.methods.updateSummary=function(summaryId){

};


userSchema.methods.getSummary=function(summaryId,callback,errback){
    User.findOne({ 'username': this.username, 'quizSummaries': summaryId },'quizSummaries', quizSummary);
    Summaries.findOne({'_id': quizSummary.quizSummaries},'quiz givenAnswers', Summary);
    return
};

userSchema.methods.getSummaries=function(callback,errback){
    return this.find({ 'quizSummaries': this.quizSummaries }, callback);
};

userSchema.statics.getUsers=function(searchword,callback){
    return this.find({$or:[{ 'name':  new RegExp(searchword, "i")},{'surname':new RegExp(searchword, "i")}]},'name surname username', callback);
};

userSchema.statics.updateTopicLevel=function(userId, userLevel, topic, difficultyLevel, isCorrected, callback) {
    if(!userId) {
        var difference = userLevel - difficultyLevel;
        if (difference <= 100 && difference > 0) {
            if (isCorrected == false) {
                if (difference > 90)
                    userLevel = userLevel - 21;
                else if (difference > 80)
                    userLevel = userLevel - 20;
                else if (difference > 70)
                    userLevel = userLevel - 19;
                else if (difference > 60)
                    userLevel = userLevel - 18;
                else if (difference > 50)
                    userLevel = userLevel - 17;
                else if (difference > 40)
                    userLevel = userLevel - 16;
                else if (difference > 30)
                    userLevel = userLevel - 15;
                else if (difference > 20)
                    userLevel = userLevel - 14;
                else if (difference > 10)
                    userLevel = userLevel - 13;
                else if (difference > 0)
                    userLevel = userLevel - 12;
            }
            else {
                if (difference > 90)
                    userLevel = userLevel + 1;
                else if (difference > 80)
                    userLevel = userLevel + 2;
                else if (difference > 70)
                    userLevel = userLevel + 3;
                else if (difference > 60)
                    userLevel = userLevel + 4;
                else if (difference > 50)
                    userLevel = userLevel + 5;
                else if (difference > 40)
                    userLevel = userLevel + 6;
                else if (difference > 30)
                    userLevel = userLevel + 7;
                else if (difference > 20)
                    userLevel = userLevel + 8;
                else if (difference > 10)
                    userLevel = userLevel + 9;
                else if (difference > 0)
                    userLevel = userLevel + 10;
            }
        }
        else {
            // caso in cui la domanda sia più difficile dell'abilità  dell'utente
            var difference = difficultyLevel - userLevel;
            if (isCorrected == false) {
                if (difference > 90)
                    userLevel = userLevel - 1;
                else if (difference > 80)
                    userLevel = userLevel - 2;
                else if (difference > 70)
                    userLevel = userLevel - 3;
                else if (difference > 60)
                    userLevel = userLevel - 4;
                else if (difference > 50)
                    userLevel = userLevel - 5;
                else if (difference > 40)
                    userLevel = userLevel - 6;
                else if (difference > 30)
                    userLevel = userLevel - 7;
                else if (difference > 20)
                    userLevel = userLevel - 8;
                else if (difference > 10)
                    userLevel = userLevel - 9;
                else if (difference > 0)
                    userLevel = userLevel - 10;
                else if (difference == 0)
                    userLevel = userLevel - 11;
            }
            else {
                if (difference > 90)
                    userLevel = userLevel + 21;
                else if (difference > 80)
                    userLevel = userLevel + 20;
                else if (difference > 70)
                    userLevel = userLevel + 19;
                else if (difference > 60)
                    userLevel = userLevel + 18;
                else if (difference > 50)
                    userLevel = userLevel + 17;
                else if (difference > 40)
                    userLevel = userLevel + 16;
                else if (difference > 30)
                    userLevel = userLevel + 15;
                else if (difference > 20)
                    userLevel = userLevel + 14;
                else if (difference > 10)
                    userLevel = userLevel + 13;
                else if (difference > 0)
                    userLevel = userLevel + 12;
                else if (difference == 0)
                    userLevel = userLevel + 11;
            }
        }
        // controllo che il livello non sia oltre i limiti
        if (userLevel > 1000)
            userLevel = 1000;
        else if (userLevel < 0)
            userLevel = 0;
        return userLevel;
    }

    else {
        this.findOne({'_id': userId}, function (err, user) {
            if (err) {
                return next(err);
            }
            user.statistics.forEach(function (statistic) {
                if (statistic.topicName == topic) {
                    var difference = statistic.topicLevel - difficultyLevel;
                    // caso in cui la domanda sia più facile dell'abilità dell'utente:
                    if (difference <= 100 && difference > 0) {
                        if (isCorrected == false) {
                            if (difference > 90)
                                statistic.topicLevel = statistic.topicLevel - 21;
                            else if (difference > 80)
                                statistic.topicLevel = statistic.topicLevel - 20;
                            else if (difference > 70)
                                statistic.topicLevel = statistic.topicLevel - 19;
                            else if (difference > 60)
                                statistic.topicLevel = statistic.topicLevel - 18;
                            else if (difference > 50)
                                statistic.topicLevel = statistic.topicLevel - 17;
                            else if (difference > 40)
                                statistic.topicLevel = statistic.topicLevel - 16;
                            else if (difference > 30)
                                statistic.topicLevel = statistic.topicLevel - 15;
                            else if (difference > 20)
                                statistic.topicLevel = statistic.topicLevel - 14;
                            else if (difference > 10)
                                statistic.topicLevel = statistic.topicLevel - 13;
                            else if (difference > 0)
                                statistic.topicLevel = statistic.topicLevel - 12;
                        }
                        else {
                            if (difference > 90)
                                statistic.topicLevel = statistic.topicLevel + 1;
                            else if (difference > 80)
                                statistic.topicLevel = statistic.topicLevel + 2;
                            else if (difference > 70)
                                statistic.topicLevel = statistic.topicLevel + 3;
                            else if (difference > 60)
                                statistic.topicLevel = statistic.topicLevel + 4;
                            else if (difference > 50)
                                statistic.topicLevel = statistic.topicLevel + 5;
                            else if (difference > 40)
                                statistic.topicLevel = statistic.topicLevel + 6;
                            else if (difference > 30)
                                statistic.topicLevel = statistic.topicLevel + 7;
                            else if (difference > 20)
                                statistic.topicLevel = statistic.topicLevel + 8;
                            else if (difference > 10)
                                statistic.topicLevel = statistic.topicLevel + 9;
                            else if (difference > 0)
                                statistic.topicLevel = statistic.topicLevel + 10;
                        }
                    }
                    else {
                        // caso in cui la domanda sia più difficile dell'abilità  dell'utente
                        var difference = difficultyLevel - statistic.topicLevel;
                        if (isCorrected == false) {
                            if (difference > 90)
                                statistic.topicLevel = statistic.topicLevel - 1;
                            else if (difference > 80)
                                statistic.topicLevel = statistic.topicLevel - 2;
                            else if (difference > 70)
                                statistic.topicLevel = statistic.topicLevel - 3;
                            else if (difference > 60)
                                statistic.topicLevel = statistic.topicLevel - 4;
                            else if (difference > 50)
                                statistic.topicLevel = statistic.topicLevel - 5;
                            else if (difference > 40)
                                statistic.topicLevel = statistic.topicLevel - 6;
                            else if (difference > 30)
                                statistic.topicLevel = statistic.topicLevel - 7;
                            else if (difference > 20)
                                statistic.topicLevel = statistic.topicLevel - 8;
                            else if (difference > 10)
                                statistic.topicLevel = statistic.topicLevel - 9;
                            else if (difference > 0)
                                statistic.topicLevel = statistic.topicLevel - 10;
                            else if (difference == 0)
                                statistic.topicLevel = statistic.topicLevel - 11;
                        }
                        else {
                            if (difference > 90)
                                statistic.topicLevel = statistic.topicLevel + 21;
                            else if (difference > 80)
                                statistic.topicLevel = statistic.topicLevel + 20;
                            else if (difference > 70)
                                statistic.topicLevel = statistic.topicLevel + 19;
                            else if (difference > 60)
                                statistic.topicLevel = statistic.topicLevel + 18;
                            else if (difference > 50)
                                statistic.topicLevel = statistic.topicLevel + 17;
                            else if (difference > 40)
                                statistic.topicLevel = statistic.topicLevel + 16;
                            else if (difference > 30)
                                statistic.topicLevel = statistic.topicLevel + 15;
                            else if (difference > 20)
                                statistic.topicLevel = statistic.topicLevel + 14;
                            else if (difference > 10)
                                statistic.topicLevel = statistic.topicLevel + 13;
                            else if (difference > 0)
                                statistic.topicLevel = statistic.topicLevel + 12;
                            else if (difference == 0)
                                statistic.topicLevel = statistic.topicLevel + 11;
                        }
                    }
                    // controllo che il livello non sia oltre i limiti
                    if (statistic.topicLevel > 1000)
                        statistic.topicLevel = 1000;
                    else if (statistic.topicLevel < 0)
                        statistic.topicLevel = 0;
                }
            });
            return user.save(callback);
        })
    }
};

userSchema.statics.addCorrect = function(userId, topic, callback) {
    this.findOne({'_id': userId}, function(err,user) {
        if (err) {
            return next(err);
        }
        user.statistics.forEach(function (statistic) {
            if (statistic.topicName == topic) {
                statistic.correctAnswers++;
            }
        });
        return user.save(callback)
    })
};

userSchema.statics.addTotal=function(userId, topic, callback) {
    this.findOne({'_id': userId}, function (err, user) {
        if (err) {
            return next(err);
        }
        user.statistics.forEach(function (statistic) {
            if (statistic.topicName == topic) {
                statistic.totalAnswers++;
            }
        });
        return user.save(callback)
    })
};

module.exports = mongoose.model('User', userSchema);