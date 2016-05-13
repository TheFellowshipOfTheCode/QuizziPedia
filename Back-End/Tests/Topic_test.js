var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

describe("View Topics Test", function(){
    it("should view topics", function(done){
        agent
            .get('/api/:lang/topics')
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                }
                else {
                    console.log(res.body);
                    res.status.should.equal(500);
                }
                done()
            })
    })
});

describe("Update Statistics Test", function(){
    it("should update the statistics of a topic", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/topic/statistics')
            .send({
                language: "it",
                topic: "Religione",
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
