const mongoose = require('mongoose')
const Question = require('../models/Question')



// createQuesiton
const createQuestion = (req, res, next) =>{
    let question = new Question({
        title: req.body.title,
        author: req.body.author,
        catagory: req.body.catagory || 'General',
        tag: req.body.tag || [],
        slug: req.body.slug || (function(){
            return req.body.title.split(' ').join('_')
        })()

    })
    question.save()
        .then(question =>{
            res.status(201).json({
                message: "Question posted successfullt",
                question
            })
        })
        .catch(error=>{
            res.status(500).json({
                message: "server Error",
                error
            })
        })

}

// Get all question controller
const allQuestion = (req, res, next) => {
    Question.find()
        .then(question =>{
            res.status(200).json({
                question
            })
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
               message: "Server Error"
            })
        })
}

//Get single question by id
const singleQuestion  = (req, res, next) => {
    let {id} =  req.params

    if(mongoose.Types.ObjectId.isValid(id)){
        Question.findById(id)
            .then(question=>{
                if(question){
                    res.status(200).json({
                        question
                    })

                }else{
                    res.status(204).json({
                        message: "No question with this id"
                    })
                }
            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({
                   message: "Server Error"
                })
            })
            
    }else{
       Question.findOne({slug: id})
                .then(question =>{
                    if(question){
                        res.status(200).json({
                            question
                        }) 
                    }else{
                        res.status(204).json({
                            message:"No post found",
                            
                        })
                    }
                })
                .catch(error=>{
                    console.log(error)
                    res.status(500).json({
                       message: "Server Error"
                    })
                })

    }


}


// UpVote
const upVote = (req, res, next) => {
    let {id} = req.params

    Question.findById(id)
            .then(question =>{
                Question.findByIdAndUpdate(id, {$set: {vote: question.vote +1  }})
                        .then(question1 =>{
                            res.json({
                                message: "Vote increase successfully"
                            })
                        })
                        .catch(error=>{
                            res.status(500).json({
                               message: "Not Vote updated"
                            })
                        })

            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({
                   message: "Server Error"
                })
            })

}
const downVote = (req, res, next) => {
    let {id} = req.params

    Question.findById(id)
            .then(question =>{
                Question.findByIdAndUpdate(id, {$set: {vote: question.vote - 1  }})
                        .then(question1 =>{
                            res.json({
                                message: "Vote decrease successfully"
                            })
                        })
                        .catch(error=>{
                            res.status(500).json({
                               message: "Not Vote updated"
                            })
                        })

            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({
                   message: "Server Error"
                })
            })

}

const searchQuestion = (req, res, next)=>{
    let keyword = req.body.keyword

    Question.find({$text: {$search:keyword}})
            .then(questions=>{
                if(questions.length === 0){
                    res.json({
                        message: "no data found"
                    })
                }else{
                    res.json({
                        questions
                    })
                }
            })
            .catch(error=>{
                req.status(500).json({
                    message: "Server erroe",
                    error
                })
            })
}



module.exports = {
    allQuestion,
    createQuestion,
    singleQuestion,
    upVote,
    downVote,
    searchQuestion
}