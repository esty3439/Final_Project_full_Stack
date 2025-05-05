const mongoose = require('mongoose')
const { applyTimestamps } = require('./Challenge')

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required:true,
            lowerCase:true,
            trim:true
        },
        usersAnswer:{
            type:String,
            required:true,
            default:"-",
        },
        correctAnswer:{
            type:String,
            required:true,
        },
        grade:{
            type:Number,
            required:true,
            default:0,
            min:0,
            max:10
        },
        //אפשרויות למענה
        options:{
            type:[mongoose.Schema.Types.ObjectId],
            required:true,
            ref:"Word"
        }
         
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Question', QuestionSchema)