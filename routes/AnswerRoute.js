
const route = require('express').Router()

const {newAnswer} = require('../controllers/AnswerController')

// Create Answer
route.post('/:id/newanswer', newAnswer)

// route eiit
route.patch('/:id', (req, res, next)=>{

})

// delete a comment
route.delete('/:id', (req, res, next)=>{

})

// get all comment
route.get('/', (req, res, next)=>{

})

module.exports = route
