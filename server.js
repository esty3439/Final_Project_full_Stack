require("dotenv").config()
const mongoose=require("mongoose")
const connectDB=require('./config/dbConn')
const createInitialAdmin=require('./Admin/CreateInitialAdmin')

const express=require ("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")

const PORT=process.env.PORT||2001
const app=express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

connectDB()

mongoose.connection.once('open',()=>{
    console.log('connected successfuly to DB')
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
    //create admin user
    createInitialAdmin()
})

mongoose.connection.on("error",(err)=>{
    console.log(err)
})

