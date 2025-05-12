const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema(
    {
       questions:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"Question"
       },
    },

    {
        timestamps: true
    }
)
module.exports = mongoose.model('Challenge', ChallengeSchema)