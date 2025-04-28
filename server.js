require("dotenv").config()
const mongoose=require("mongoose")
const connectDB=require('./config/dbConn')

const express=require ("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")

const PORT=process.env.PORT||2001
const app=express()

app.use(cors(corsOptions))
app.use(express.json())

connectDB()

mongoose.connection.once('open',()=>{
    console.log('connected successfuly to DB')
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
})

mongoose.connection.on("error",(err)=>{
    console.log(err)
})

