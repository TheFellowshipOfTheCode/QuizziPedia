app.factory("QuestionItemModel", [function() {

    //simula tutti i campi della domanda, qui in moniera sbrigativa
    var QuestionItemModel= function() {
        var domanda=[
          { "id": "D5", 	"level": 500,	"lang": "ita",
          "question":	[

            {
        "typeDomanda": "spaziVuoti",
        "questionText": "Giulio Cesare era un console dei dinosauri .",
        "answer":
        [
          {
             "parolaNumero": 2
             },
            {
             "parolaNumero": 5
             }]
          }
        ]
      },
          { "id": "D4", 	"level": 500,	"lang": "ita",
          "question":	[

            {
        "typeDomanda": "ordinamentoImmagini",
        "questionText": "Questi super eroi hanno un nome. Ordina le immagini in modo da poter mettere i super erori in ordine alfabetico.",
        "answer":
      [

  		  {
  			     "url": "/Images/domandeOrdinamentoImmagini/D4_1.jpg",
  			     "position": 1
  		  },

  	    {
  			     "url": "/Images/domandeOrdinamentoImmagini/D4_2.png",
  			     "position": 2
  		  }

		  ]
	  }
        ]},
          { "id": "D3", 	"level": 500,	"lang": "ita",
          "question":	[

            {
        "typeDomanda": "ordinamentoStringhe",
        "questionText": "Ordina questi numeri in modo decrescente.",
        "answer":
        [

    		  {
    			     "text": "1",
    			     "position": 4
    		  },

    	    {
    			     "text": "2",
    			     "position": 3
    		  },

    	    {
    			     "text": "7",
    			     "position": 2
    		  },

          {
    			     "text": "9",
    			     "position": 1
    		  }

  		  ]
  	  }
        ]},
          { "id": "D2", 	"level": 500,	"lang": "ita",
          "question":	[

          {  "typeDomanda": "collegamento", "image": "/img/veroFalso/D0_1.png", "questionText": "Unisci questi nemici storici.",
          "answer":
                 [

                   {
                        "text1": "cane",
                        "text2": "gatto"
                   },

                   {
                        "url1": "/Images/collegamento/D2_2.jpg",
                        "text2": "olio"
                   },

                   {
                        "url1": "/Images/collegamento/D2_1.jpg",
                        "url2": "/Images/collegamento/D2_5.png"
                   }
                   ,

                   {
                        "url1": "/Images/collegamento/D2_2.jpg",
                        "text2": "olio"
                   },

                   {
                        "url1": "/Images/collegamento/D2_1.jpg",
                        "url2": "/Images/collegamento/D2_5.png"
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
