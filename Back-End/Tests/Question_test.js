/*******************************************************************************
* Name: test
* Description: classe che contiene dei tests;
* Creation data: 13-06-2016;
* Author: Matteo Granzotto.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Creata;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

var app = require('../Server');
var request = require("supertest");
var should = require("should");
var agent = request.agent(app);

describe("Signin Test", function () {
    it("should signin and return a user object", function (done) {
        this.timeout(10000);
        agent
            .post('/api/:lang/signin')
            .send({username: 'aferrara', password: 'ciaociao'})
            .end(function (err, res) {
                if (!err && res.status == 200)
                    res.body.user.username.should.equal("aferrara");
                else
                    res.status.should.equal(500);
                done()
            });
    });
});


describe("Get User Questions Test", function () {
    it("should return all questions of a user", function (done) {
        this.timeout(10000);
        agent
            .get('/api/it/userquestion')
            .end(function (err, res) {
                if (!err && res.status == 200)
                    console.log(res.body);
                else
                    res.status.should.equal(500);
                done()
            });
    });
});


describe("Get Question Test", function(){
    it("should get question of an user", function(done){
        this.timeout(10000);
        agent
            .get('/api/:lang/userquestion/574168240a7ba626375283af')
            .expect(200)
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body);
                }
                else
                    res.status.should.equal(500);
                done()
            });
    })
});

/*
describe("Create Question Test", function(){
    it("should create a question", function(done){
        this.timeout(10000);
        agent
            .post('/api/:lang/userquestion')
            .send({
                makeWith: "qml",
                language: "it",
                question: [
                    {
                        type: "ordinamentoImmagini",
                        questionText: "Questi super eroi hanno un nome. Ordina le immagini in modo da poter mettere i super erori in ordine alfabetico.",
                        image: "/Images/veroFalso/prova.png",
                        answers: [
                            {
                                url: "/Images/domandeOrdinamentoImmagini/D4_1.jpg",
                                position: 1
                            },
                            {
                                url: "/Images/domandeOrdinamentoImmagini/D4_2.png",
                                position: 2
                            }
                        ]
                    },
                    {
                        type: "spaziVuoti",
                        questionText: "Giulio Cesare era un console dei dinosauri .",
                        image: "/Images/veroFalso/prova.png",
                        answers: [
                            {
                                parolaNumero: 4
                            },
                            {
                                parolaNumero: 1
                            }
                        ]
                    },
                    {
                        type: "ordinamentoStringhe",
                        questionText: "Ordina questi numeri in modo decrescente.",
                        image: "/Images/veroFalso/prova.png",
                        answers: [
                            {
                                text: "1",
                                position: 4
                            },
                            {
                                text: "2",
                                position: 3
                            },
                            {
                                text: "7",
                                position: 2
                            },
                            {
                                text: "9",
                                position: 1
                            }
                        ]
                    },
                    {
                        type: "collegamento",
                        image: "/Images/veroFalso/prova.png",
                        questionText: "Unisci questi nemici storici.",
                        answers: [
                            {
                                text1: "cane",
                                text2: "gatto"
                            },
                            {
                                url1: "/Images/collegamento/D2_2.jpg",
                                text2: "olio"
                            },
                            {
                                url1: "/Images/collegamento/D2_1.jpg",
                                url2: "/Images/collegamento/D2_5.png"
                            },
                            {
                                url1: "/Images/collegamento/D2_2.jpg",
                                text2: "olio"
                            },
                            {
                                url1: "/Images/collegamento/D2_1.jpg",
                                url2: "/Images/collegamento/D2_5.png"
                            }
                        ]
                    },
                    {
                        type: "veroFalso",
                        image: "/Images/veroFalso/prova.png",
                        answers: [
                            {
                                text: "In Inghilterra la guida è destra.",
                                isItRight: false
                            }
                        ]
                    },
                    {
                        type: "rispostaMultipla",
                        questionText: "Quali di questi numeri è pari?",
                        image: "/Images/veroFalso/prova.png",
                        answers: [
                            {
                                text: "1",
                                url: "/Images/veroFalso/prova.png",
                                isItRight: false
                            },
                            {
                                text: "2",
                                url: "/Images/veroFalso/prova.png",
                                isItRight: true
                            },
                            {
                                text: "7",
                                url: "/Images/veroFalso/prova.png",
                                isItRight: false
                            },
                            {
                                text: "9",
                                url: "/Images/veroFalso/prova.png",
                                isItRight: false
                            }
                        ]
                    }
                ],
                keywords: ["Prova"],
                topic: "Informatica"
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
        this.timeout(10000);
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
        this.timeout(10000);
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
*/
describe("View NextQuestion Test", function(){
    it("should view the next question of a training", function(done){
        this.timeout(20000);
        agent
            .post('/api/:lang/user/training/question')
            .send({
                language: "it",
                topic: "Informatica",
                keywords:[],
                level:500,
                alreadyAnswered:[]
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



describe("View Keywords Test", function(){
    it("should view the keywords of a topic", function(done){
        this.timeout(10000);
        agent
            .post('/api/:lang/topic/keywords')
            .send({
                topic: "Motori"
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
/*
describe("Update Statistics Question Test", function(){
    it("should update statistics  question", function(done){
        this.timeout(10000);
        agent
            .put('/api/:lang/usertraining/questionstatistics')
            .send({
                questionId : '5729c0fdc80eb653c3029c2e',
                userLevel: 500,
                IsCorrected : false,
            })
            .end(function(err,res){
                if (!err && res.status == 200){
                    console.log(res.body)
                    res.body.message.should.equal("Statistiche domande aggiornate correttamente");
                }
                else
                    res.status.should.equal(500);
                done()
            })


    })
});
*/
