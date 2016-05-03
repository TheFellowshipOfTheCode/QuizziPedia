var app = require('../Server');;
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);


/*describe("Signin Test", function () {
    it("should signin and return a user object", function (done) {
        agent
            .post('/api/:lang/signin')
            .send({username: 'aferrara', password: 'ciaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    if (res.body.success == false)
                        res.body.message.should.equal("Login non effettuato")
                    else
                        res.body.user.username.should.equal("aferrara")
                done()
            });
    });
})*/


describe("Quiz tests", function() {
    it("should create a quiz", function(done) {
        agent
            .post('/api/:lang/user/quiz')
            .send({
                title: "questionario pazzesco",
                correctAnswers: 13
            })
            .end(function(err, res) {
                if (!err && res.status == 200) {
                    res.body.title.should.equal("questionario pazzesco");
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    })
})
