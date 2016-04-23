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
            type: Schema.Types.ObjectId,
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
    return bcrypt.compareSync(password, this.local.password);
};



module.exports = mongoose.model('User', userSchema);