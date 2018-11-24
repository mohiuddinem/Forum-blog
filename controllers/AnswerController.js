
const Answer = require('../models/Answer')

const Question  = require('../models/Question')

const newAnswer = (req, res, next)=>{
    let { postId } = req.params
    
 
    
    let answers = new Answer({
        userid: req.body.userid,
        postId,
        answerbody: req.body.answerbody
    })

    answers.save()
            .then(data =>{
                Question.findById(postId)
                        .then(question=>{
                            
                            question.answers.push(data)
                            Question.findOneAndUpdate({_id: postId}, {$set: question})
                                    .then(data2=>{
                                        res.json({
                                            messsage:"Answer added"
                                        })
                                    })

                        })
                        

            })
            .catch(error=>{
                res.status(500).json({
                    messsage: "Server errod answer not post",
                    error
                })
            })
}




module.exports =  {
    newAnswer
}