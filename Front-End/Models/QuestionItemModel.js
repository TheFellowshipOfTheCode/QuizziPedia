app.factory("QuestionItemModel", [function() {

    //simula tutti i campi della domanda, qui in moniera sbrigativa
    var QuestionItemModel= function() {
        var domanda=[
          { "id": "D2", 	"level": 500,	"lang": "ita",
          "question":	[

          {  "typeDomanda": "collegamento", "image": "/img/veroFalso/D0_1.png",
          "answer":
                 [

                   {
                        "text1": "cane",
                        "text2": "gatto"
                   },

                   {
                        "url1": "/img/collegamento/D0_2.png",
                        "text2": "olio"
                   },

                   {
                        "url1": "/img/collegamento/D0_1.png",
                        "url2": "/img/collegamento/D0_5.png"
                   }

                 ]

          }
        ]},
          { "id": "D0", 	"level": 500,	"lang": "ita",
        "question":	[

        {  "typeDomanda": "veroFalso", "image": "/img/veroFalso/D0_1.png",
         "answer":  [
              {"text": "In Italia la guida è destra.", "isItRight": true }
          ]
        },

        {  "typeDomanda": "veroFalso", "image": "/img/veroFalso/D0_1.png",
         "answer":  [
              {"text": "In Inghilterra la guida è destra.", "isItRight": true }
          ]
        },

        {  "typeDomanda": "rispostaMultipla", "questionText": "Quali di questi numeri è pari?", "url": "/img/rispostaMultipla/D0_3.png",
          "answer": [
            { "text": "1ssdfsfsdfsdfsdfsdfsdfdsf", "url": "/img/rispostaMultipla/D0_1.png", "isItRight": false },

            { "text": "2sdfsdfdsfsdfsdfdsfsdfdsfds", "url": "/img/rispostaMultipla/D0_2.png", "isItRight": true},

            {"text": "7sdfdsfsdfsdfdsfdsfdsf", "url": "/img/rispostaMultipla/D0_3.png", "isItRight": false },

            {"text": "9sdfdsfdsfsfsdfsdfsdfsdfs", "url": "/img/rispostaMultipla/D0_4.png", "isItRight": false }
          ]
        },

        {  "typeDomanda": "rispostaMultipla", "questionText": "Quali di questi numeri è paridddddddddddddddddddddddddddddd?", "url": "/img/rispostaMultipla/D0_3.png",
          "answer": [
            { "text": "1", "url": "/img/rispostaMultipla/D0_1.png", "isItRight": false },

            { "text": "2", "url": "/img/rispostaMultipla/D0_2.png", "isItRight": true},

            {"text": "7", "url": "/img/rispostaMultipla/D0_3.png", "isItRight": false },

            {"text": "9", "url": "/img/rispostaMultipla/D0_4.png", "isItRight": false }
          ]
        }
      ]},
      { "id": "D0", 	"level": 500,	"lang": "ita",
      "question":	[

      {  "typeDomanda": "veroFalso", "image": "/img/veroFalso/D0_1.png",
       "answer":  [
            {"text": "In Italia la guida è destra.", "isItRight": true }
        ]
      }
    ]}


       ];

      this.getCurrentPieceOfQuestions= function(index)
      {
        return domanda[index].question;
      }

    }

    return QuestionItemModel;
}]);
