/*******************************************************************************
* Name: test
* Description: classe che contiene dei tests;
* Creation data: 13-06-2016;
* Author: Matteo Granzotto.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Creata;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);
var user;

describe("Signin Test", function () {
    it("should signin and return a user object", function (done) {
        this.timeout(10000);
        agent
            .post('/api/:lang/signin')
            .send({username: 'fberton', password: 'ciaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    res.body.user.username.should.equal("fberton");
                else
                    res.status.should.equal(500);
                done()
            });
    });
});

describe("User Done Quizzes Test", function () {
    it("should return userdonequizzes", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userdonequizzes')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    console.log(res.body);
                done()
            });
    });
})

describe("GetInfo Test", function() {
    it("return user info", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/user/info')
            .end(function(err,res){
                if (!err && res.status==200){
                    console.log(res.body);
                }
                else
                    res.status.should.equal(500);
                done()
            });
    });
});


describe("Search Users Test", function(){
    it("should return user", function(done){
        this.timeout(10000);
        agent
            .get('/api/it/searchuser/matteo')
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                }
                else {
                    res.status.should.equal(500);
                }
                done()
            })
    })
});

describe("UserDetails Test", function(){
    it("should return details of a user", function(done){
        this.timeout(10000);
        agent
            .get('/api/it/userdetails/fberton')
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                }
                else {
                    res.status.should.equal(500);
                }
                done()
            })
    })
});
/*
describe("Update Statistics Test", function(){
    it("should update the statistics of a user", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/user/statistics')
            .send({
                language: "it",
                userId: "5746ded2f391418251e95be3",
                userLevel: "",
                topic: "Animali",
                difficultyLevel: 555,
                isCorrected: true
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                }
                else {
                    res.status.should.equal(500);
                }
                done()
            })
    })
});


describe("Update Info User Test", function(){
    it("should update the info of a user", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/user/info')
            .send({
                language: "it",
                name: "Alberto",
                surname: "Ferrara",
                email: "albertoferrara92@gmail.com"
            })
            .end(function(err,res){
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            })
    })
});

describe("Update Password Test", function(){
    it("should update the password of a user", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/user/password')
            .send({
                language: "it",
                password: "ciaociao"
            })
            .end(function(err,res){
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            })
    })
});

describe("Change User Type Test", function(){
    it("should change the type of a user", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/user/type')
            .end(function(err,res){
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            })
    })
});
*/
