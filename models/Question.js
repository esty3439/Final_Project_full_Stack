const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Word"
        },
        
        correctAnswer:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Word"
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