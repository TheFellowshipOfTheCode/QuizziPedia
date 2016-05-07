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
        privilege: String,
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
    this.findOne({_id:userId}, function(err,user){
        if(err) {
            return next(err);
        }
        user.statistics.findOne({topicName:topic}, function(err,statistic) {
            if(err) {
                return next(err);
            }
            var differentLevel = statistic.level - difficultyLevel;
            // caso in cui la domanda sia più facile dell'abilità dell'utente:
            if(differentLevel <= 100 && differentLevel > 0) {
                if(isCorrected == false) {
                    if(differentLevel > 90)
                        statistic.level = statistic.level - 11;
                    else if(differentLevel > 80)
                        statistic.level = statistic.level - 10;
                    else if(differentLevel > 70)
                        statistic.level = statistic.level - 9;
                    else if(differentLevel > 60)
                        statistic.level = statistic.level - 8;
                    else if(differentLevel > 50)
                        statistic.level = statistic.level - 7;
                    else if(differentLevel > 40)
                        statistic.level = statistic.level - 6;
                    else if(differentLevel > 30)
                        statistic.level = statistic.level - 5;
                    else if(differentLevel > 20)
                        statistic.level = statistic.level - 4;
                    else if(differentLevel > 10)
                        statistic.level = statistic.level - 3;
                    else if(differentLevel > 0)
                        statistic.level = statistic.level - 2;
                }
                else {
                    if(differentLevel > 90)
                        statistic.level = statistic.level + 2;
                    else if(differentLevel > 80)
                        statistic.level = statistic.level + 3;
                    else if(differentLevel > 70)
                        statistic.level = statistic.level + 4;
                    else if(differentLevel > 60)
                        statistic.level = statistic.level + 5;
                    else if(differentLevel > 50)
                        statistic.level = statistic.level + 6;
                    else if(differentLevel > 40)
                        statistic.level = statistic.level + 7;
                    else if(differentLevel > 30)
                        statistic.level = statistic.level + 8;
                    else if(differentLevel > 20)
                        statistic.level = statistic.level + 9;
                    else if(differentLevel > 10)
                        statistic.level = statistic.level + 10;
                    else if(differentLevel > 0)
                        statistic.level = statistic.level + 11;
                }
            }
            else{
                // caso in cui la domanda sia più difficile dell'abilità  dell'utente
                var difference = difficultyLevel - statistic.level;
                if(isCorrected == false) {
                    if (difference > 90)
                        statistic.level = statistic.level - 2;
                    else if (difference > 80)
                        statistic.level = statistic.level - 3;
                    else if (difference > 70)
                        statistic.level = statistic.level - 4;
                    else if (difference > 60)
                        statistic.level = statistic.level - 5;
                    else if (difference > 50)
                        statistic.level = statistic.level - 6;
                    else if (difference > 40)
                        statistic.level = statistic.level - 7;
                    else if (difference > 30)
                        statistic.level = statistic.level - 8;
                    else if (difference > 20)
                        statistic.level = statistic.level - 9;
                    else if (difference > 10)
                        statistic.level = statistic.level - 10;
                    else if (difference > 0)
                        statistic.level = statistic.level - 11;
                    else if (difference == 0)
                        statistic.level = statistic.level - 1;
                }
                else {
                    if(difference > 90)
                        statistic.level = statistic.level + 11;
                    else if(difference > 80)
                        statistic.level = statistic.level + 10;
                    else if(difference > 70)
                        statistic.level = statistic.level + 9;
                    else if(difference > 60)
                        statistic.level = statistic.level + 8;
                    else if(difference > 50)
                        statistic.level = statistic.level + 7;
                    else if(difference > 40)
                        statistic.level = statistic.level + 6;
                    else if(difference > 30)
                        statistic.level = statistic.level + 5;
                    else if(difference > 20)
                        statistic.level = statistic.level + 4;
                    else if(difference > 10)
                        statistic.level = statistic.level + 3;
                    else if(difference > 0)
                        statistic.level = statistic.level + 2;
                    else if(difference == 0)
                        statistic.level = statistic.level + 1;
                }
            }
            // controllo che il livello non sia oltre i limiti
            if(statistic.level > 1000)
                statistic.level = 1000;
            else if(statistic.level < 0)
                statistic.level = 0;
            return question.save(callback)
        })
    })
};

module.exports = mongoose.model('User', userSchema);