
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

/*
describe("Get Questions Test", function(){
    it("should get questions of an user", function(done){
        agent
            .get('/api/:lang/user/questions')
            .end(function(err,res){ console.log(res)
                if (!err && res.status == 200){
                    res.body.message.should.equal("Domanda creata correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            });
        //done()

    })
});
*/

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




describe("Edit Question Test", function(){
    it("should edit a question", function(done){
        agent
            .put('/api/:lang/user/question')
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


/*
describe("Update Level Question Test", function(){
    it("should update a question", function(done){
        agent
            .put('/api/:lang/user/training/questionstatistics')
            .send({
                questionId : '57290236d04ef5c044faa246',
                userLevel: 200,
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

    */