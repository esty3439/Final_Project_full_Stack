//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge=require('../models/Challenge')

//data
const { words, createVegtableQuestions,createVegtableChallenge} = require('./data')


//functions
//insert words to database
const insertWords = async () => {
    const checkWords = await Word.find().lean()
    if (!checkWords.length) {
        for (let i = 0; i < words.length; i++) {
            const newWord = await Word.create({
                word: words[i].word,
                translation: words[i].translation,
                categoryName: words[i].categoryName,
                img: {
                    data: words[i].img.data,
                    contentType: words[i].img.contentType
                }
            })

            if (!newWord)
                console.log(`error creating word: ${words[i].word}`)
        }
        console.log(`words table was filled successfully`)
    }
}

//insert questions to database
const insertQuestions = async () => {
    const checkQuestions = await Question.find().lean()
    if (!checkQuestions.length) {
        //insert vegtable questions
        const vegtablesQuestions=await createVegtableQuestions()
        for (let i = 0; i < vegtablesQuestions.length; i++) {
            const newQuestion = await Question.create({
                question: vegtablesQuestions[i].question,
                correctAnswer: vegtablesQuestions[i].correctAnswer,
                options: vegtablesQuestions[i].options,
            })

            if (!newQuestion)
                console.log(`error creating question`)
        }
        console.log(`questions table was filled successfully`)
    }
}

//insert challenges to database
const insertChallenges=async()=>{
    const checkChallenges=await Challenge.find().lean()
    if(!checkChallenges.length)
    {
        //insert vegtable challenge
        const vegtableChallenge=await createVegtableChallenge()
        const newChallenge=await Challenge.create({
            questions:vegtableChallenge.questions
        })
        if(!newChallenge)
            console.log(`error creating challenge`)
        console.log(`challenges table was filled successfully`)
    }
}


module.exports = { insertWords, insertQuestions,insertChallenges}