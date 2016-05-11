
var app = require('../Server');
var request = require("supertest");
var should = require("should")
var agent = request.agent(app);
var user;
/*
    describe("Signin Test", function () {
        it("should signin and return a user object", function (done) {
            agent
                .post('/api/:lang/signin')
                .send({username: 'fberton', password: 'ciaociao'})
                .end(function (err, res) {
                    if (!err && res.status == 200)
                        if (res.body.success == false)
                            res.body.message.should.equal("Login non effettuato")
                        else{
                            user=res.body.user;
                            res.body.user.username.should.equal("fberton")
                        }
                    done()
                });
        });
    })

    describe("GetInfo Test", function() {
        it("return user info", function (done) {
            agent
                .get('/api/:lang/user/:'+user._id)
                .expect(200)
                .expect('Content-Type', /json/ )
                .end(function(err,res){
                    if (!err && res.status==200){
                        res.body.name.should.equal("franco")
                        res.body.surname.should.equal("berton")
                    }
                    done()
                });
        });
    })

    describe("Delete Test", function() {
        it("should delete user authenticated", function (done) {
            agent
                .delete('/api/:lang/user')
                .expect(200)
                .expect('Content-Type', /json/ )
                .end(function(err,res){
                    if (!err && res.status==200){
                        res.body.name.should.equal("franco")
                        res.body.surname.should.equal("berton")
                    }
                    done()
                });
        });
    })
*/

describe("Search Users Test", function(){
    it("should return user", function(done){
        agent
            .post('/api/it/searchuser')
            .send({
                tosearch: "matteo"
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


describe("Update Statistics Test", function(){
    it("should update the statistics of a user", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/user/statistics')
            .send({
                language: "it",
                userId: "57275c6b008cdfb81994ba2a",
                userLevel: "",
                topic: "Religione",
                difficultyLevel: 555,
                isCorrected: false
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

