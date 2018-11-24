const route = require('express').Router()
const Question = require('../models/Question')


const {allQuestion,
    createQuestion, 
    singleQuestion,
    upVote,
    downVote,
    searchQuestion
} = require('../controllers/QuestionController')

const AnswerRoute = require('../routes/AnswerRoute')

// create question
route.post('/createQuestion', createQuestion) 
// All Question
route.get('/', allQuestion) 

// get single question
route.get('/:id', singleQuestion) 

// search question by catagory
route.get('/',searchQuestion) 

// edit Question 
route.get('/',(req, res, next) => {
    
}) 

// Delete Question 
route.patch('/:id/upvote', upVote) 

// Up Vote Question 
route.patch('/:id/downvote', downVote) 

// Down Vote Question 


route.use('/', AnswerRoute)


module.exports = route
