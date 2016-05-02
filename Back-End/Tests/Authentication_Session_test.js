
var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

    describe("Signup Test", function() {
        it("should signup and return a user object", function (done) {
            var userJSON = {
                'name': 'matteo',
                'surname': 'granzotto',
                'email': 'matteo.granzotto@gmail.com',
                'username': 'mgranzotto',
                'password': 'ciaociao'
            }
            request(app)
                .post('/api/:lang/signup')
                .send(userJSON)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (!err && res.status == 200) {
                        if (res.body.success == false)
                            res.body.message.should.equal("Registrazione non effettuata")
                        else
                            res.body.user.username.should.equal("mgranzotto")
                    }
                    done()
                });
        })
    });

    describe("Signin Test", function () {
        it("should signin and return a user object", function (done) {
            agent
                .post('/api/:lang/signin')
                .send({username: 'fberton', password: 'ciaociao'})
                .end(function (err, res) {
                    if (!err && res.status == 200)
                        if (res.body.success == false)
                            res.body.message.should.equal("Login non effettuato")
                        else
                            res.body.user.username.should.equal("fberton")
                    done()
                });
        });
    })

    describe("User Loggedin Test", function () {
        it("should return a user object", function (done) {
            agent
                .get('/api/:lang/loggedin')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (!err && res.status == 200) {
                        res.body.should.not.equal(0)
                    }
                    done()
                });
        });
    })


    describe("Signout Test", function () {
        it("should signout", function (done) {
            agent
                .post('/api/:lang/signout')
                .send({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (!err)
                        res.status.should.equal(200)
                    done()
                });
        });
    })
