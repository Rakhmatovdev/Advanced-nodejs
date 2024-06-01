const express = require('express');

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({id:1,name:"Jasur",})
})

app.post("/post",(req,res)=>{
const {firstName,lastName}=req.body
const message=`His full name - ${firstName} ${lastName}`
    res.send(message)
})

app.delete("/:id",(req,res)=>{
    const {id}=req.params
    res.send(id)
})


app.put("/:id",(req,res)=>{
    const {id}=req.params
    const body=req.body
    res.json(id,body)
})

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>console.log(`Listening on - http://localhost/${PORT}`))