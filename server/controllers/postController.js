const postModel=require("../models/postModel")


// create post
const createPostController=async(req,res)=>{
    try{
       const {title,description}=req.body;
    //    validate
     if(!title ||!description){
        return res.status(400).send({
          success:false,
          message:"Please fill all the fields"
        })
     }
     const post=await postModel({title,description,postedBy:req.auth._id}).save();
     res.status(201).send({
       success:true,
       message:"Post Created Successfully", 
       post
     })
    }catch(error){
      res.status(500).send({
        success:false,
        message:"Error in Create Post Api",
        error
      })
    }
}

// get all the posts 
const getAllPostController= async(req,res)=>{
   try{
        const posts=await postModel.find().populate("postedBy","_id name").sort({createdAt:-1});
        res.status(200).send({
          success:true,
          message:"Posts Retrieved Successfully",
          posts
        })
   }catch(error){
     console.log(error);
     res.status(500).send({
       success:false,
       message:"Error in Get All Posts Api",
       error
     })
   }
}

module.exports={createPostController, getAllPostController};