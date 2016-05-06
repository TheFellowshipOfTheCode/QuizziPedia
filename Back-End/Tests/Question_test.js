var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);
/*
describe("Signin Test", function () {
    it("should signin", function (done) {
        agent
            .post('/api/:lang/signin')
            .send({username: 'aferrara', password: 'ciaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    if (res.body.success == false)
                        res.body.message.should.equal("Login non effettuato")
                    else
                        res.body.user.username.should.equal("aferrara")
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
                question: {
                    type: "VF",
                    questionText: "ciao",
                    image: "",
                    answers: [{
                        text:"ciao",
                        url:"",
                        attributesForTForMultiple:{
                            isItRight:true
                        }
                    }]
                },
                keywords:[],
                level:500,
                totalAnswers:0,
                correctAnswers:0
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    res.body.makeWith.should.equal("qml");
                    res.body.language.should.equal("ita");
                }
                else res.status.should.equal(500);
                done()
            })
    })
});
*/
describe("View Question Test", function(){
    it("should view a question", function(done){
        agent
            .post('/api/:lang/user/training/question')
            .send({
                language: "it",
                topic: "Patente",
                keywords:["Strada","Guida"],
                level:500,
                alreadyAnswered:["5729c0fdc80eb653c3029c4e"]
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                    //console.log(res.body.question[1].answers); //la prova che il contenuto di answers si vede
                    res.body.language.should.equal("it");
                    res.body.level.should.equal(500);
                    //res.body.keywords.should.containDeep(["Strada","Guida"]);
                }
                else res.status.should.equal(500);
                done()
            })
    })
});