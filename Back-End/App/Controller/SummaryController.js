/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::SummaryController;
 * Description: classe che gestisce la logica applicativa riguardante la
 * visualizzazione e la modifica dei riepiloghi dei questionari;
 * Creation data: 04-05-2016;
 * Author: Marco Prelaz.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SummaryController_20160504;
 * Update data: 04-05-2016;
 * Description: Creata classe;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 * ID: SummaryController_20160512;
 * Update data: 12-05-2016;
 * Description: Aggiunto il metodo createSummary;
 * Autore: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
var Summary = require('../Model/SummaryModel');
var User = require('../Model/UserModel');

exports.createSummary = function(req, res) {
    Summary.createSummary(req.body.quiz, req.body.answers, function(err, summary) {
        if(err) return res.status(500).json({code:88, title: "Errore Riepilogo", message: "Riepilogo non creato"});
        else {
            User.findOne({'_id':req.user._id}, function(err,user) {
                if(err)
                    return next(err);
                user.quizSummaries.push(summary._id);
                user.save();
                return res.send(summary);
            });
        }
    })
};

exports.getQuizzes = function(req, res) {
    if (req.user.quizSummaries.length>0){
        var quiz_summary=[]
        req.user.quizSummaries.forEach(function(quizSummary,index){
            Summary.findSummary(quizSummary, function(err, elem){
                if (err){
                    return res.status(500).json({code:333, title:"Errore Riepiloghi", message:"Riepiloghi Err",})
                }
                User.getUser(elem.author, function(err,user){
                    elem.author=user.username
                    quiz_summary.push(elem)
                    if (index+1==req.user.quizSummaries.length)
                        res.send(quiz_summary);
                })
                
            })
            
        })
    }

    }