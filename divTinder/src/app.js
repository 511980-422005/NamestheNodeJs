const express = require('express');
const app = express();
const connectToDB = require("./config/database");
const User = require("./models/user");
const { auth }= require("./middlewares/auth");

app.use(express.json());

app.use("/",auth);



//find api finds the user with emailid
app.get("/user/find/",async (req,res)=>{
    const email = req.body.emailId;

    try{
        
   const user = await User.find({emailId :email});
  
   if(!user){
    res.status(404).send("user not found");
   }
   else{
    res.send(user);
   }  }
   catch(e){
    
    res.status(404).send("something went wrong");
   }
})

//feed api fetch all the users from the database
app.get("/user/feed/",async (req,res)=>{ 

    try{
        
   const user = await User.find();
  
   if(user.length===0){
    res.status(404).send("no user found");
   }
   else{
    res.send(user);
   }  }
   catch(e){
    
    res.status(404).send("something went wrong");
   }
});

//signup api add a user if the user emailid not already exist and return the user id
app.post("/user/signUp/",async (req,res,next)=>{
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId :email});
   if(user.length===0){
   next();
   }else{
    res.status(404).send("Email id already registerd");
   }
    }   catch(e){
    
        res.status(404).send("something went wrong");
       }
    
},
   async (req,res)=>{
        try{
            
    const userObj = req.body;
    const user = new User(userObj);
    user.save();
    const userID = await User.find(userObj);
    console.log(userID);
    console.log("User added successfully....");
    res.send("User added successfully.... with ID:  " + userID[0]._id);
        }
    catch(e){
    
        res.status(404).send("something went wrong");
       }
})

//delete api remove the user from the databse with the any information about the record
app.delete("/user/remove",async (req,res)=>{
    try{
        
const info = req.body ;
const deleteInfo = await User.deleteMany(info);
res.send(deleteInfo);

    }catch{
        res.send("something went wrong");
    }
})


//update api update the user data with given user id
app.patch("/user/update",async(req,res)=>{
    const userID = req.body.userID;
    const data = req.body;
    try{
const info = await User.findByIdAndUpdate( userID ,data);
res.send(info); 
    }catch(err){ 
        res.send("something went wrong");
    }
})

 connectToDB()
    .then(()=>{

        console.log("Connected to MongoDB   DB ");
        app.listen(3000,()=>{
            console.log("server running on http://localhost:3000 successfully");
        });
    
}).catch((e)=>{
    console.log(e);
});







