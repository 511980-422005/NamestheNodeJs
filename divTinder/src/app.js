const express = require('express');
const app = express();

const {auth}=require('./middlewares/auth');

app.use("/user/sayHi",auth,(req,res)=>{
    throw new Error("He he he");
    res.send("Hi");
});
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Iyoo error uh");
    }
})
app.listen(3000,()=>{
    console.log("server running on http://localhost:3000 successfully");
});
