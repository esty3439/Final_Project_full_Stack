//models
const Word = require('../models/Word')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const Category = require('../models/Category')

//data
const { words, createVegtableQuestions, createVegtableChallenge, createVegtableCategory } = require('./data')


//functions
//insert words to database
const insertWords = async () => {
    const checkWords = await Word.find().lean()
    let wordCounter =0
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
            else
              wordCounter++
        }
        console.log(`${wordCounter} words were inserted successfully to words table`)
    }
}

//insert questions to database
const insertQuestions = async () => {
    const checkQuestions = await Question.find().lean()
    let questionCounter =0
    if (!checkQuestions.length) {
        //insert vegtable questions
        const vegtablesQuestions = await createVegtableQuestions()
        for (let i = 0; i < vegtablesQuestions.length; i++) {
            const newQuestion = await Question.create({
                question: vegtablesQuestions[i].question,
                correctAnswer: vegtablesQuestions[i].correctAnswer,
                options: vegtablesQuestions[i].options,
            })

            if (!newQuestion)
                console.log(`error creating question`)
            else
               questionCounter++
        }
        console.log(`${questionCounter} questions were inserted successfully to questions table`)
    }
}

//insert challenges to database
const insertChallenges = async () => {
    const checkChallenges = await Challenge.find().lean()
    if (!checkChallenges.length) {
        //insert vegtable challenge
        const vegtableChallenge = await createVegtableChallenge()
        const newChallenge = await Challenge.create({
            questions: vegtableChallenge.questions
        })
        if (!newChallenge)
        {
            console.log(`error creating challenge`)
            return
        }
        console.log(`challenges table was filled successfully`)
    }
}

//insert categories to database
const insertCategories = async () => {
    const checkCategories = await Category.find().lean()
    if (!checkCategories.length) {
        //insertVegtableCategory
        const vegtableCategory=await createVegtableCategory()
        const newCategory=await Category.create({
            name:vegtableCategory.name,
            wordsList:vegtableCategory.wordsList,
            challenge:vegtableCategory.challenge
        })
        if(!newCategory)
        {
            console.log(`error creating category ${vegtableCategory.name}`)
            return
        }
        console.log(`categories table was filled successfully`)
    }
}


module.exports = { insertWords, insertQuestions, insertChallenges,insertCategories}