
var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

    describe("Signup Test", function() {
        it("should signup and return a user object", function (done) {
            var userJSON = {
                'name': 'matteo',
                'surname': 'granzotto',
                'email': 'cada.granzotto@gmail.com',
                'username': 'dada',
                'password': 'ciaociao'
            }
            request(app)
                .post('/api/:lang/signup')
                .send(userJSON)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (!err && res.status == 200) {
                        res.body.message.should.equal("Registrazione avvenuta con successo")
                    }
                    else
                        res.body.message.should.equal("Registrazione non effettuata")
                    done()
                });
        })
    });

    describe("Signin Test", function () {
        it("should signin and return a user object", function (done) {
            agent
                .post('/api/:lang/signin')
                .send({username: 'alberto.ferrara@gmail.com', password: 'ciaociao'})
                .end(function (err, res) {
                    if (!err && res.status == 200)
                        res.body.user.username.should.equal("aferrara")
                    else
                        res.status.should.equal(500)
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
