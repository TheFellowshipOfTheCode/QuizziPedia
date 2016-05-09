var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
//var Summaries=require('./SummaryModel');
var userSchema = new mongoose.Schema(
    {
        name: String,
        surname: String,
        email: String,
        userImg: String,
        username: String,
        password: String,
        statistics: [{
            topicName: String,
            topicLevel: Number,
            correctAnswers: Number,
            totalAnswers: Number
        }],
        experienceLevel: Number,
        quizSummaries:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Summaries'
        }],
        privilege: String
    }
);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.editUser=function(content,callback,errback){
    return User.update({username: this.username},content, callback);
}

userSchema.methods.editPassword=function(password,errback){

}

userSchema.methods.setImg=function(image,errback){

}

userSchema.methods.updateStatistics=function(statistics,callback){

}

userSchema.methods.upLevel=function(callback){

}

userSchema.methods.deleteUser=function(callback){
    return this.model('User').findByIdAndRemove(this._id , callback);
}

userSchema.methods.updateSummary=function(summaryId){

}

userSchema.methods.getSummary=function(summaryId,callback,errback){
    User.findOne({ 'username': this.username, 'quizSummaries': summaryId },'quizSummaries', quizSummary);
    Summaries.findOne({'_id': quizSummary.quizSummaries},'quiz givenAnswers', Summary);
    return
}

userSchema.methods.getSummaries=function(callback,errback){
    return this.model('User').find({ 'quizSummaries': this.quizSummaries }, callback);
}

userSchema.statics.getUsers=function(searchword,callback,errback){

}

userSchema.statics.updateTopicLevel=function(userId, topic, difficultyLevel, isCorrected, callback) {
    this.findOne({'_id':userId}, function(err,user) {
        if (err) {
            return next(err);
        }
        user.statistics.forEach(function(statistic){
            if(statistic.topicName==topic){
                var differentLevel = statistic.topicLevel - difficultyLevel;
                // caso in cui la domanda sia più facile dell'abilità dell'utente:
                if (differentLevel <= 100 && differentLevel > 0) {
                    if (isCorrected == false) {
                        if (differentLevel > 90)
                            statistic.topicLevel = statistic.topicLevel - 11;
                        else if (differentLevel > 80)
                            statistic.topicLevel = statistic.topicLevel - 10;
                        else if (differentLevel > 70)
                            statistic.topicLevel = statistic.topicLevel - 9;
                        else if (differentLevel > 60)
                            statistic.topicLevel = statistic.topicLevel - 8;
                        else if (differentLevel > 50)
                            statistic.topicLevel = statistic.topicLevel - 7;
                        else if (differentLevel > 40)
                            statistic.topicLevel = statistic.topicLevel - 6;
                        else if (differentLevel > 30)
                            statistic.topicLevel = statistic.topicLevel - 5;
                        else if (differentLevel > 20)
                            statistic.topicLevel = statistic.topicLevel - 4;
                        else if (differentLevel > 10)
                            statistic.topicLevel = statistic.topicLevel - 3;
                        else if (differentLevel > 0)
                            statistic.topicLevel = statistic.topicLevel - 2;
                    }
                    else {
                        if (differentLevel > 90)
                            statistic.topicLevel = statistic.topicLevel + 2;
                        else if (differentLevel > 80)
                            statistic.topicLevel = statistic.topicLevel + 3;
                        else if (differentLevel > 70)
                            statistic.topicLevel = statistic.topicLevel + 4;
                        else if (differentLevel > 60)
                            statistic.topicLevel = statistic.topicLevel + 5;
                        else if (differentLevel > 50)
                            statistic.topicLevel = statistic.topicLevel + 6;
                        else if (differentLevel > 40)
                            statistic.topicLevel = statistic.topicLevel + 7;
                        else if (differentLevel > 30)
                            statistic.topicLevel = statistic.topicLevel + 8;
                        else if (differentLevel > 20)
                            statistic.topicLevel = statistic.topicLevel + 9;
                        else if (differentLevel > 10)
                            statistic.topicLevel = statistic.topicLevel + 10;
                        else if (differentLevel > 0)
                            statistic.topicLevel = statistic.topicLevel + 11;
                    }
                }
                else {
                    // caso in cui la domanda sia più difficile dell'abilità  dell'utente
                    var difference = difficultyLevel - statistic.topicLevel;
                    if (isCorrected == false) {
                        if (difference > 90)
                            statistic.topicLevel = statistic.topicLevel - 2;
                        else if (difference > 80)
                            statistic.topicLevel = statistic.topicLevel - 3;
                        else if (difference > 70)
                            statistic.topicLevel = statistic.topicLevel - 4;
                        else if (difference > 60)
                            statistic.topicLevel = statistic.topicLevel - 5;
                        else if (difference > 50)
                            statistic.topicLevel = statistic.topicLevel - 6;
                        else if (difference > 40)
                            statistic.topicLevel = statistic.topicLevel - 7;
                        else if (difference > 30)
                            statistic.topicLevel = statistic.topicLevel - 8;
                        else if (difference > 20)
                            statistic.topicLevel = statistic.topicLevel - 9;
                        else if (difference > 10)
                            statistic.topicLevel = statistic.topicLevel - 10;
                        else if (difference > 0)
                            statistic.topicLevel = statistic.topicLevel - 11;
                        else if (difference == 0)
                            statistic.topicLevel = statistic.topicLevel - 1;
                    }
                    else {
                        if (difference > 90)
                            statistic.topicLevel = statistic.topicLevel + 11;
                        else if (difference > 80)
                            statistic.topicLevel = statistic.topicLevel + 10;
                        else if (difference > 70)
                            statistic.topicLevel = statistic.topicLevel + 9;
                        else if (difference > 60)
                            statistic.topicLevel = statistic.topicLevel + 8;
                        else if (difference > 50)
                            statistic.topicLevel = statistic.topicLevel + 7;
                        else if (difference > 40)
                            statistic.topicLevel = statistic.topicLevel + 6;
                        else if (difference > 30)
                            statistic.topicLevel = statistic.topicLevel + 5;
                        else if (difference > 20)
                            statistic.topicLevel = statistic.topicLevel + 4;
                        else if (difference > 10)
                            statistic.topicLevel = statistic.topicLevel + 3;
                        else if (difference > 0)
                            statistic.topicLevel = statistic.topicLevel + 2;
                        else if (difference == 0)
                            statistic.topicLevel = statistic.topicLevel + 1;
                    }
                }
                // controllo che il livello non sia oltre i limiti
                if (statistic.topicLevel > 1000)
                    statistic.topicLevel = 1000;
                else if (statistic.topicLevel < 0)
                    statistic.topicLevel = 0;
            }
        });
        console.log(user.statistics);
        return user.save(callback)
    })
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
        console.log(user.statistics);
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
        console.log(user.statistics);
        return user.save(callback)
    })
};

module.exports = mongoose.model('User', userSchema);