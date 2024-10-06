const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        min:4,
        max:64,
        trim:true,
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);