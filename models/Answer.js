const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: String,
        ref: 'Question'
    },
    answerbody:{
        type: String,
        required:true,
        maxlength:1000
    }
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer