const express = require('express');
const  mongoose  = require('mongoose');
require("dotenv").config()

//Routes
const postRouter = require('./routers/post.router');
const authRouter = require('./routers/auth.router');


const fileUpload = require('express-fileupload');
const requestTime = require('./middlewares/request-time');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error.middleware');
const app=express()
const cors = require("cors")

//Middleware

app.use(requestTime)

app.use(cors())
app.use(express.json())
app.use(cookieParser({}))
app.use(express.static("static"))
app.use(fileUpload())
//Routes
app.use("/api/post",postRouter)
app.use("/api/auth",authRouter)

//error
app.use(errorMiddleware)

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