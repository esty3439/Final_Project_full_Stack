const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Word"
        },
        usersAnswer:{
            type:String,
            required:true,
            default:"-",
        },
        correctAnswer:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Word"
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