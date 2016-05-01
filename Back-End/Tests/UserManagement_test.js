
var app = require('../Server');
var request = require("supertest");
var should = require("should")
var agent = request.agent(app);
var user;
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
