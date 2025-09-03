const MyCategory = require('../models/MyCategory')
const MyWord = require('../models/MyWord')

//get all categories for user
const getAllCategories = async (req, res) => {
    const user = req.user
    const categories = await MyCategory.find({ user: user._id }).lean()
    if (!categories)
        return res.status(400).json({ message: "no categories found" })
    res.json(categories)
}

//create for user
const createCategory = async (req, res) => {
    const { name } = req.body

    //validation:
    //required fields
    if (!name)
        return res.status(400).send('category name is required')

    const user = req.user

    const newCategory = await MyCategory.create({ name, user: user._id })
    if (!newCategory)
        return res.status(400).json({ message: `error occurred while creating category ${name}` })
    return res.status(201).json({ message: `category ${name} was created successfully` })
}

//update for user
const updateCategory = async (req, res) => {
    const { id, name } = req.body

    //validation:
    //required fields
    if (!name || !id)
        return res.status(400).send('Category name and id are required')

    const user = req.user

    const foundCategory = await MyCategory.findOne({ _id: id, user: user._id }).exec()
    if (!foundCategory)
        return res.status(400).json({ message: "no Category found" })

    //update fields
    foundCategory.name = name

    const updatedCategory = await foundCategory.save()
    if (!updatedCategory)
        return res.status(400).json({ message: `error occurred while updating category ${name}` })

    //rename the category name field in words
    await Promise.all(
        foundCategory.words.map(async (word) => {
            const foundWord = await MyWord.findById(word).exec()
            if (foundWord)
            {
                foundWord.word.categoryName=updatedCategory.name
                await foundWord.save()
            }
                
        })
    )

    return res.status(201).json({ message: `category ${name} was updated successfully` })
}

//delete for user
const deleteCategory = async (req, res) => {
    const { id } = req.body

    //validation
    //required fields
    if (!id)
        return res.status(400).send('id is required')

    const user = req.user

    const foundCategory = await MyCategory.findOne({ _id: id, user: user._id }).exec()

    if (!foundCategory)
        return res.status(400).json({ message: "no Category found" })

    //delete category words from myWords table
    await Promise.all(
        foundCategory.words.map(async (word) => {
            const foundWord = await MyWord.findById(word).exec()
            if (foundWord)
                await foundWord.deleteOne()
        })
    )

    const deletedCategory = await foundCategory.deleteOne()
    if (!deletedCategory)
        return res.status(400).json({ message: `error occurred while deleting category with id ${id}` })
    return res.status(200).json({ message: `category with id ${id} was deleted successfully` })
}

//get category words
const getWordsOfCategory = async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).send("id is required");

    const category = await MyCategory.findById(id).populate({ path: "words" })

    if (!category)
        return res.status(404).json({ message: "Category not found" })

    return res.json(category.words)
}

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getWordsOfCategory }