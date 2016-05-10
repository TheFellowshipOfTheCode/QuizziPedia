
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

describe("Get All Questions Test", function () {
    it("should return all questions of a topic", function (done) {
        agent
            .get('/api/it/allquestions/Religione/Dio,Porco')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    //res.body.equal("aferrara")
                    console.log(res.body);
                else
                    res.status.should.equal(500)
                done()
            });
    });
})




describe("Get Question Test", function(){
    it("should get question of an user", function(done){
        agent
            .get('/api/:lang/userquestion/5728c4504c16020e07c41449')
            .expect(200)
            .end(function(err,res){
                if (!err && res.status == 200){
                    res.status.should.equal(200);
                }
                else
                    res.status.should.equal(500);
                done()
            });
    })
});



describe("Create Question Test", function(){
    it("should create a question", function(done){
        agent
            .post('/api/:lang/userquestion')
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




describe("Edit Question Test", function(){
    it("should edit a question", function(done){
        agent
            .put('/api/:lang/userquestion')
            .send({
                _id: "5728c32a71e52d0307348f8f",
                makeWith: "qml",
                language: "ing",
                question: [{
                    type: "VF",
                    questionText: "miao",
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
                    res.body.message.should.equal("Domanda modificata correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            })


    })
});



describe("Update Statistics Question Test", function(){
    it("should update statistics  question", function(done){
        agent
            .put('/api/:lang/usertraining/questionstatistics')
            .send({
                questionId : '572901e8d04ef5c044faa243',
                userLevel: 450,
                IsCorrected : true,
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    res.body.message.should.equal("Statistiche domande aggiornate correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            })


    })
});

describe("View NextQuestion Test", function(){
    it("should view the next question of a training", function(done){
        this.timeout(15000);
        agent
            .post('/api/:lang/user/training/question')
            .send({
                language: "it",
                topic: "Patente",
                keywords:["Strada","Guida"],
                level:500,
                alreadyAnswered:["5729c0fdc80eb653c3029c4e","5729c0fdc80eb653c3029c2e"]
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                    //console.log(res.body.question[1].answers); //la prova che il contenuto di answers si vede
                    res.body.language.should.equal("it");
                    res.body.level.should.equal(500);
                    //res.body.keywords.should.containDeep(["Strada","Guida"]);
                }
                else {
                    console.log(res.body);
                    res.status.should.equal(500);
                }
                done()
            })
    })
});

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

describe("View Keywords Test", function(){
    it("should view the keywords of a topic", function(done){
        agent
            .post('/api/:lang/topic/keywords')
            .send({
                topic: "Patente"
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




describe("Update Statistics Question Test", function(){
    it("should update statistics  question", function(done){
        agent
            .put('/api/:lang/usertraining/questionstatistics')
            .send({
                questionId : '572901e8d04ef5c044faa243',
                userLevel: 450,
                IsCorrected : true,
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    res.body.message.should.equal("Statistiche domande aggiornate correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            })


    })
});

