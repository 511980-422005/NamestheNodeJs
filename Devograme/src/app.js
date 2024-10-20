const express = require('express');
const app = express();
const connectToDB = require("./config/database");
const User = require("./models/user");
const { auth }= require("./middlewares/auth");
const cors = require('cors'); // Import the cors package
 

app.use(cors());
app.use(express.json());

app.use("/",auth);
 

//signup api add a user if the user emailid not already exist and return the user id
// example data
// {
//     "firstName": "Poojana",
//     "lastName": "S",
//     "userName": "Poojana_s_2005",
//     "emailId": "Poojana.s@exasmple.com",
//     "password": "mypassword123",
//     "phoneNumber": "9876543210",
//     "profile": "http://google.com/profile.png",
//     "about": "I am a software developer."
//   }
  
app.post("/user/signUp/",async (req,res)=>{
    try{      
    
        const userObj = req.body;
        const user = new User(userObj);
        const userAdded =  await user.save();  
        console.log("User added successfully....");
        res.send({ status : "success" , userID: userAdded._id }); 
       
    } 
    catch(err){
    
        res.status(500).send({status : "Failed" ,message : err.message});
    
        }
    });
    


//find api finds the user with emailid
app.get("/user/logIn/",async (req,res)=>{ 
    const data = req.body;
    try{

   const user = await User.findById(data?.userID);
  
   if(!user){
    throw new Error("user not found");
   }
   else if(data.password == user.password){
    res.send({status:"success" , userID: user._id});
   }
else{
    
    throw new Error(" Invalid userName , password");
}
}
   catch(err){
    
    res.status(404).send({status : "Failed" ,message : err.message}); 
   }
})



//update api update the user data with given user id
app.patch("/user/update",async(req,res)=>{

    const userID = req.body.userID;
    const data = req.body;

try{

const isUser = await User.findById( userID );

if(!isUser){ 
    throw new Error("User Not Found");
}else{
    delete  data?.userID;
} 
const ALLOWED_UPDATES = [ "firstName",
    "lastName",
    "password",
    "phoneNumber",
    "profile",
    "skills",
    "about"];


const NOT_ALLOWED = [];

const check = Object.keys(data).every(k=>{
    if(!ALLOWED_UPDATES.includes(k)){
        NOT_ALLOWED.push(k); 
        return false;
    }return true;
});

if(!check){
    throw new Error(`Update not allowed for ${NOT_ALLOWED}`);
}

const info = await User.findByIdAndUpdate( userID ,data,{runValidators :true});
res.send({status : "success" ,message : "User updated successfully"}); 
    }catch(err){ 
        res.status(404).send({status : "Failed" ,message : err.message}); 
    }
})





//feed api fetch all the users from the database
app.get("/user/feed/",async (req,res)=>{ 

    try{
        
   const user = await User.find();
  
   if(user.length===0){
    throw new Error("no user found");
   }
   else{
    res.send(user);
   }  }
   catch(err){
    
    res.status(404).send({status : "Failed" ,message : err.message}); 
   }
});


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



 connectToDB()
    .then(()=>{

        console.log("Connected to MongoDB   DB ");
        app.listen(3000,()=>{
            console.log("server running on http://localhost:3000 successfully");
        });
    
}).catch((e)=>{
    console.log(e);
});







