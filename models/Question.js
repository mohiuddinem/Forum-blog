
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        default: 'General'
    },
    tag: {
        type:[String]
    },
    vote: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
        trim:true
    },
    answer: [
        {
            type: String
        }
    ]

},{
    timestamps:true
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question