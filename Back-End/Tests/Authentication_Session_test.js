
var app = require('../Server');;
var request = require("supertest");
var should = require("should")

describe("Autentication_Session Test", function() {

    it("check signin", function (done) {
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
            done()
        });
    });

    it("check signup", function (done) {
        var userJSON={'name':'matteo', 'surname':'granzotto', 'email':'matteo.granzotto@gmail.com', 'username':'mgranzotto', 'password':'ciaociao'}
        request(app)
            .post('/api/:lang/signup')
            .send(userJSON)
            .expect(200)
            .expect('Content-Type', /json/ )
            .end(function(err,res){
                if (!err && res.status==200) {
                    if (res.body.success == false) {
                        res.body.message.should.equal("Registrazione non effettuata")
                    }
                    else {
                        res.body.user.username.should.equal("mgranzotto")
                    }
                }
                done()
            });

    });


    it("check signout", function (done) {
        request(app)
            .post('/api/:lang/signout')
            .send({})
            .expect('Content-Type', /json/ )
            .expect(200)
            .end(function(err,res){
                if (!err)
                    res.status.should.equal(200)
                done()
            });

    });

    it("check loggedin ", function (done) {
        request(app)
            .get('/api/:lang/loggedin')
            .expect('Content-Type', /json/ )
            .expect(200)
            .end(function(err,res){
                if (!err && res.status==200){
                    res.body.should.equal(0)
                }
                done()
            });
    });
})
