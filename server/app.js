const express=require("express")
const { connect } = require("mongoose")
const connectDB = require("./config/db.js")
const dotenv = require("dotenv")
const courseRoute = require("./routes/courseRoutes")
const authRoute = require("./routes/authRoutes")
const dns = require("dns")
const cors  = require("cors")


const app=express()

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config()
app.use(express.json())
app.use(cors())



app.use("/api/courses",courseRoute)
app.use("/api/auth",authRoute)


connectDB()
app.listen(3000,()=>{
    console.log("listening to the port")
})