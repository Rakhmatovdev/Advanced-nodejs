const express = require('express');
const  mongoose  = require('mongoose');
require("dotenv").config()

//Routes
const postRouter = require('./routers/post.router');
const fileUpload = require('express-fileupload');
const requestTime = require('./middlewares/request-time');
const app=express()

app.use(express.json())
app.use(express.static("static"))
app.use(fileUpload())
app.use(requestTime)

//Routes
app.use("/api/post",postRouter)

const PORT=process.env.PORT || 8080
const MONGO=process.env.MONGODB_URI
const connectMongoDB= async ()=>{
try {
  await mongoose.connect(MONGO).then(()=>{console.log("Connected DB...")
  app.listen(PORT,()=>console.log(`Listening on - http://localhost/${PORT}`))
})
} catch (error) {
    console.log(error);
}
}
connectMongoDB()