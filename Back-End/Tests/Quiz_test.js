var app = require('../Server');;
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);


describe("Signin Test", function () {
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
})

describe("Get topic Test", function() {
    it("should return topic", function (done) {
        agent
            .get('/api/:lang/topic')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done();
            })
    })
});


describe("Quiz tests", function() {
    it("should create a quiz", function (done) {
        agent
            .post('/api/:lang/userquiz')
            .send({
                title: "questionario prova2",
                questions:[ "5728f8dd49a8f4a73f2bb79c",
                    "5728fedf4d19e8050425050a",
                    "5728ff613576f90b0491dc96",
                    "5729004f88dd572a04fd49ef",
                    "572901e8d04ef5c044faa243"],
            })
            .end(function (err, res) {
                if (!err && res.status == 200) {
                    res.body.title.should.equal("questionario prova2");
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    })
})

describe("Quiz tests", function() {
    it("should get a quiz", function (done) {
        agent
            .get('/api/:lang/userquiz/573233e79b9b577603f506a2')
            .end(function (err, res) {
                if (!err && res.status == 200) {
                    res.body.title.should.equal("questionario prova2");
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    })
})

describe("Search Quiz Test", function () {
    it("should return questions Test", function (done) {
        agent
            .post('/api/it/searchquiz')
            .send({tosearch:'ciao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500)
                done()
            });
    });
})
    
    /*

    it("should return the desired quiz", function(done) {
        agent
            .get('/api/:lang/user/quiz/:quizId')

            .end(function(err, res) {
                if (!err && res.status == 200) {
                    res.body.title.should.equal("questionario top");
                    res.body.correctAnswers.should.equal(13);
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    })
})*/
