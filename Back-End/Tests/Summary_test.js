var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

describe("Signin Test", function () {
    it("should signin and return a user object", function (done) {
        agent
            .post('/api/:lang/signin')
            .send({username: 'alberto.ferrara@gmail.com', password: 'ciaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    res.body.user.username.should.equal("aferrara");
                else
                    res.status.should.equal(500);
                done()
            });
    });
});

describe("Create Summary Test", function(){
    it("should create a summary of a quiz", function(done){
        //this.timeout(15000);
        agent
            .post('/api/:lang/user/quiz/summary')
            .send({
                language: "it",
                quiz: "573233c36697ad7203eebac2",
                answers:[{question:{'_id':"5729c0fdc80eb653c3029c2e"},'isCorrected':true},{question:{'_id':"57343f882aad4ba97602fbb4"},'isCorrected':true}]
            })
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

