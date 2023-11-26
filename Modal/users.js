const mongoose = require("./index")

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"firstName is required"]
    },
    lastname:{
        type:String,
        required:[true,"lastName is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:{
            validator:validateEmail,
            message:"Invalid Email Id"
        }    
    },
    password: {
        type: String,
        require:[true,"password is required"]
    },
    batch:{
        type:String,
        required:[true,"batch is required"]
    },
    role: {
        type: String,
        default:"student"
    }
  
},{versionKey:false,collection:"users"})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;