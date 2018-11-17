const route = require('express').Router()
const Question = require('../models/Question')

const {allQuestion} = require('../controllers/QuestionController')


// All Question
route.get('/',(req, res, next) => {
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
}) 

// get single question
route.get('/',(req, res, next) => {
    
}) 

// search question by catagory
route.get('/',(req, res, next) => {
    
}) 

// create question
route.get('/',(req, res, next) => {
    
}) 

// edit Question 
route.get('/',(req, res, next) => {
    
}) 

// Delete Question 
route.get('/',(req, res, next) => {
    
}) 

// Up Vote Question 
route.get('/',(req, res, next) => {
    
}) 

// Down Vote Question 


module.exports = route
