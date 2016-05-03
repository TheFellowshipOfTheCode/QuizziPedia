
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
                    res.body.user.username.should.equal("aferrara")
                else
                    res.status.should.equal(500)
                done()
            });
    });
})

describe("Create Question Test", function(){
    it("should create a question", function(done){
        agent
            .post('/api/:lang/user/question')
            .send({
                makeWith: "qml",
                language: "ita",
                question: [{
                    type: "VF",
                    questionText: "ciao",
                    image: "",
                    answers: [{
                        text:"ciao",
                        url:"",
                        attributesForTForMultiple:{
                            isItRight:true
                        }
                    }],
                }],
            })
            .end(function(err,res){ 
                if (!err && res.status == 200){
                    res.body.message.should.equal("Domanda creata correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            })


    })
});