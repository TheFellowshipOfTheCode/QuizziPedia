
var app = require('../Server.js');
var request = require("supertest");
var should = require("should")


describe("signin", function() {
    it("signin user", function (done) {
        var userJSON = {username:'fberton', password:'ciaociao'}
        request(app)
            .post('/api/:lang/signin')
            .send(userJSON)
            .expect(200)
            .expect('Content-Type', /json/ )
            .end(function(err,res){
                if (!err && res.status==200)
                    if (res.body.success==false){
                        res.body.message.should.equal("Login non effettuato")}
                    else{
                        res.body.user.username.should.equal("fberton")}
            });
        done()
    });
}))

describe("getInfo", function() {
    it("check info user", function (done) {
        request(app)
            .post('/api/:lang/signin')
            .send(userJSON)
            .expect(200)
            .expect('Content-Type', /json/ )
            .end(function(err,res){
                if (!err && res.status==200)
                    if (res.body.success==false){
                        res.body.message.should.equal("Login non effettuato")}
                    else{
                        res.body.user.username.should.equal("fberton")}
            });
        done()
    });
})