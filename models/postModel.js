const mongoose = require("mongoose")

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please add post title"]
    },
    description:{
        type:String,
        required:[true,"please add post description"]
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"please add postedBy"]
    }
},{timestamps:true});

module.exports=mongoose.model("Post",postSchema);
