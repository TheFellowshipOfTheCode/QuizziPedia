var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
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
            type: mongoose.Types.ObjectId,
            ref: 'Summaries'
        }]
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

}

userSchema.methods.editPassword=function(password,errback){

}

userSchema.methods.setImg=function(image,errback){

}

userSchema.methods.updateStatistics=function(statistics,callback){

}

userSchema.methods.upLevel=function(callback){

}

userSchema.methods.deleteUser=function(callback,errback){

}

userSchema.methods.updateSummary=function(summaryId){

}

userSchema.methods.getSummaries=function(callback,errback){
    return this.model('User').find({ 'quizSummaries': this.quizSummaries }, callback);
}

userSchema.statics.getUsers=function(searchword,callback,errback){

}


module.exports = mongoose.model('User', userSchema);