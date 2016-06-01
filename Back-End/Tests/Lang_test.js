var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

describe("Get Language Keywords Test", function () {
    it("should return the keywords of a language", function(done) {
        this.timeout(10000);
        agent
            .get('/api/it')
            .end(function(err, res) {
                if (!err && res.status == 200) {
                    console.log(res.body)
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    });
});

describe("Get Existing Languages Test", function () {
    it("should return the existing languages", function(done) {
        this.timeout(10000);
        agent
            .get('/api/supported/lang/give/me')
            .end(function(err, res) {
                if (!err && res.status == 200) {
                    console.log(res.body)
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    });
});

describe("Get Language Abbreviation Test", function () {
    it("should return the abbreviation of a language", function(done) {
        this.timeout(10000);
        agent
            .get('/api/supported/lang/give/me/Italiano')
            .end(function(err, res) {
                if (!err && res.status == 200) {
                    console.log(res.body)
                }
                else {
                    res.status.should.equal(500);
                }
                done();
            })
    });
});