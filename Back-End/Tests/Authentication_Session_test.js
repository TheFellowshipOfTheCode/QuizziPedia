
var app = require('../Server.js');
var request = require("supertest");
var should = require("should")

describe("signin", function() {
    it("check authentication user", function (done) {
        var userJSON = {username:'fberton', password:'ciaociao'}
        request(app)
        .post('/api/:lang/signin')
        .send(userJSON)
        .expect(200)
        .expect('Content-Type', /json/ )
        .end(function(err,res){
            if (!err && res.status==200)
                if (res.body.success==false)
                    res.body.message.should.equal("Login non effettuato")
                else
                    res.body.user.username.should.equal("fberton")
        });
        done()
    });
})

describe("signup", function() {
    it("check registration user", function (done) {
        var userJSON={name:'franco', surname:'berton', email:'franco.berton@gmail.com', username:'fberton', password:'ciaociao'}
        request(app)
            .post('/api/:lang/signup')
            .send(userJSON)
            .expect('Content-Type', /json/ )
            .expect(200)
            .end(function(err,res){
                if (!err && res.status==200)
                    if (res.body.success==false)
                        res.body.message.should.equal("Registrazione non effettuata")
                    else
                        res.body.user.username.should.equal("fberton")
            });
        done()
    });
})




describe("signout", function() {
    it("check signout user", function (done) {
        request(app)
            .post('/api/:lang/signout')
            .send({})
            .expect('Content-Type', /json/ )
            .expect(200)
            .end(function(err,res){
                if (!err)
                    res.status.should.equal(200)
            });
        done()
    });
})

describe("loggedin", function() {
    it("check user loggedin ", function (done) {
        request(app)
            .get('/api/:lang/loggedin')
            .expect('Content-Type', /json/ )
            .expect(200)
            .end(function(err,res){
                if (!err && res.status==200){
                    res.body.should.equal(0)
                }
            });
        done()
    });
})