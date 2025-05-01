const mongoose=require('mongoose')

const CourseSchema=new mongoose.Schema(
    {
        level:{
            type:String,
            required:true,
            enum:["Easy","Medium","Hard"]
        },
        fullWordList:{
            type:[mongoose.Schema.Types.ObjectId],
            required:true,
            ref:"Word"
        },
        categories:{
            type:[mongoose.Schema.Types.ObjectId],
            required:true,
            ref:"Category" 
        },
        solvedChalenges:
        {
            type:[mongoose.Schema.Types.ObjectId],
            required:true,
            ref:"Challenge" 
        }
    },
    {
        timestamps:true
    }
)

module.exports('Course',CourseSchema)