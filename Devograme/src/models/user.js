const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            validate : function(value){
                if(value.length>100){
                    throw new Error("First name not more then 100 letters");
                }
            }
        },
        lastName : {
            type : String,
            validate : function(value){
                if(value.length>100){
                    throw new Error("Last name not more then 100 letters");
                }
            }
        },
        userName : {
            type : String ,
            required : true,
            unique :true,
            validate: function(value) {
                if(value.length>100){
                    throw new Error("User name is too long... User name not more then 100 letters");
                }
                const userNameRegex = /^[a-zA-Z0-9_]+$/;
                return userNameRegex.test(value);
            }
        },
        emailId : {
            type : String,
            required : true,
            unique :true,
            immutable: true,
            validate: function(value) {
                if(value.length>100){
                throw new Error("EmailId is too long...");
            }
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            }
        },
        password : {
            type : String,
            required : true,
            minLength:8,
            validate : function(value){
                if(value.length>100){
                    throw new Error("Password not more then 20 letters");
                }
            }
        },
        phoneNumber : {
            type : String,
            minLength:10,
            maxLength :15,
            validate : function(value){
                if(value.length>100){
                    throw new Error("Phone number not more then 20 length");
                }
            }
        }, 
        profile:{
            type : String,
            default : "http://google.com/profile.png",
            validate : function(value){
                if(value.length>100){
                    throw new Error("keep URLs under 2,000 characters.");
                }
            }
        },
        skills :{
            type : [String],
            validate : (value)=>{
if(value.length>10){
    throw new Error("Skills must be less then or equal to 10");
}
            }
        },
        about :{
            type : String,
            validate : function(value){
                if(value.length>1000){
                    throw new Error("keep about under 1,000 characters.");
                }
            }

        }
 },{
    timestamps : true
}
   
);
module.exports = mongoose.model("User", userSchema);