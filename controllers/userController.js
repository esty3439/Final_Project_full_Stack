const User = require('../models/User')

//get all users only for admin
const getAllUsers = async (req, res) => {
    const user= req.user
    //chek if user is admin
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })
    const users = await User.find({}, { password: 0 }).lean()
    if (!users)
        return res.status(400).json({ message: "no users found" })
    res.json(users)
}

//get one user only for admin and user
const getSingleUser = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send('id is required')
    //chek if user is admin or user
    const user= req.user
    let findedUser
    if (user.roles === "Admin")
        findedUser = await User.findOne({ _id: id }, { password: 0 }).lean()
    else
        findedUser = await User.findOne({ userName: user.userName, _id: id }, { password: 0 }).lean()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })
    res.json(findedUser)
}

//put only for user
const updateUser = async (req, res) => {
    const { id, fullName, email, phone, password, userName } = req.body

    //validation
    //required fields
    if (!id || !fullName || !email || !password)
        return res.status(400).send('id fullName email and paswword are required')

    const user= req.user
    const findedUser = await User.findOne({ userName: user.userName, _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })

    //update fields
    findedUser.userName = userName?userName:user.userName
    findedUser.password = password
    findedUser.phone = phone
    findedUser.email = email
    findedUser.fullName = fullName

    //chek if userName is unique
    if (userName != user.userName) {
        const existUser = await User.findOne({ userName: userName }).lean()
        if (existUser)
            return res.status(409).json({ message: 'userName must be unique' })
    }
    const updatedUser = await findedUser.save()
    if (!updatedUser)
        return res.status(400).json({ message: `error occurred while updating user ${userName}` })
    return res.status(201).json({ message: `user ${user.userName} was updated successfully` })
}

//delete for admin
const deleteUser = async (req, res) => {
    //validation:

    //chek required fields
    const { id } = req.body
    if (!id)
        return res.status(400).send('id is required')

    //chek if user is admin
    const user= req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    const findedUser = await User.findOne({ _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })
    const deletedUser = await findedUser.deleteOne()
    if (!deletedUser)
        return res.status(400).json({ message: `error occurred while updating user ${userName}` })
    return res.status(201).json({ message: `user with id ${id} was deleted successfully` })
}

//update active only admin
const updateUserByAdmin = async (req, res) => {
    //validation:

    //chek required fields
    const { id,active,roles} = req.body
    if (!id)
        return res.status(400).send('id is required')

    //chek if user is admin
    const user= req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    const findedUser = await User.findOne({ _id: id }).exec()
    if (!findedUser)
        return res.status(400).json({ message: "no user found" })
    findedUser.active = active?active:findedUser.active
    findedUser.roles=roles?roles:findedUser.roles
    const updatedUser = await findedUser.save()
    if (!updatedUser)
        return res.status(400).json({ message: `error occurred while updating user ${userName}` })
    return res.status(201).json({ message: `user with ID ${id} was updated successfully` })
}

module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser, updateUserByAdmin }