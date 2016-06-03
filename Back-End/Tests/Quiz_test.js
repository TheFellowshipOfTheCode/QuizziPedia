var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);


describe("Signin Test", function () {
    it("should signin and return a user object", function (done) {
        this.timeout(10000);
        agent
            .post('/api/:lang/signin')
            .send({username: 'aferrara', password: 'ciaociaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    res.body.user.username.should.equal("aferrara");
                else
                    res.status.should.equal(500);
                done()
            });
    });
});


describe("Get user approved Test", function() {
    it("should return user approved", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userapproved')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done();
            })
    })
});

describe("Get users active  Test", function() {
    it("should return users active", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userquizactiveUser/573ec3f7c97365bd014e3121')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done();
            })
    })
});
/*
describe("Put active field quiz Test", function() {
    it("should return active ok", function (done) {
        this.timeout(10000);
        agent
            .put('/api/:lang/quizactive/573ed361ebdba94cfee823bd')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done();
            })
    })
});
*/



describe("Get topic Test", function() {
    it("should return topic", function (done) {
        this.timeout(10000);
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

describe("Get personal Quizzes Test", function() {
    it("should return the quizzes of a user", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userquiz')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done();
            })
    })
});

/*
describe("Quiz tests", function() {
    it("should create a quiz", function (done) {
        this.timeout(10000);
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
*/
describe("Quiz tests", function() {
    it("should get a quiz", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userquiz/5741796380586d4a380ffe10')
            .end(function (err, res) {
                if (!err && res.status == 200) {
                    console.log(res.body);
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    })
});

describe("Search Quiz Test", function () {
    it("should return quiz Test", function (done) {
        this.timeout(10000);
        agent
            .get('/api/it/searchquiz/Ingegneria')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            });
    });
});


describe("Get Quiz subscribe Test", function () {
    it("should return subscribe of a Quiz Test", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/usersubscribe')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            });
    });
});

describe("Get Quiz subscribers Test", function () {
    it("should return subscribers of a Quiz Test", function (done) {
        this.timeout(10000);
        agent
            .get('/api/:lang/userquizsubscribe/573ec3f7c97365bd014e3121')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            });
    });
});

describe("Get Quiz desidered Test", function () {
    it("should return the desired quiz", function(done) {
        this.timeout(10000);
        agent
            .get('/api/it/userquiz/573ec3f7c97365bd014e3121')
            .end(function(err, res) {
                if (!err && res.status == 200) {
                    console.log(res.body);
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    });
});
