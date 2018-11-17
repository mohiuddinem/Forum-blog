
const express = require('express')
const mongoose = require('mongoose')

const questionRouter = require('./routes/QuestionRoute')

mongoose.connect('mongodb://localhost/forum',{ useNewUrlParser: true },()=>{
    console.log('Db is connected...')
})
var bodyParser = require('body-parser')

const Question = require('./models/Question')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/question', questionRouter)



app.listen(8080, ()=>{
    console.log('Server Is Running')
})



