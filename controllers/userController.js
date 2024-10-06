const userModel =require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const JWT = require("jsonwebtoken");
var {expressjwt:jwt} = require("express-jwt");


// middleware
const requireSignIn=jwt({
   secret:process.env.JWT_SECRET,
    algorithms:["HS256"]
})


// register
const registerController = async(req,res)=>{
   try{

      const {name,email,password}=req.body;
      if(!name || !email || !password){
          return res.status(400).send({
            success:false,
            message:"please fill all the field"
          })
        }
      if(password.length <4){
          return res.status(400).send({
            success:false,
            message:"password must be atleast 4 character long"
         })  
      }
    
      const existingUser=await userModel.findOne({email})
      if(existingUser){
         return res.status(500).send({
            success:false,
            message:"user Already Register With This email"
         })
      }
      // hashed password
      const hashedPassword=await hashPassword(password);
      const user=await userModel({name,email,password:hashedPassword}).save();
      res.status(201).send({
        success:true,
        message:"Registration successful please login"
      })

   }catch(error){
      return res.status(500).send({
        success:false,
        message:"Error in register Api",
        error
      });
   }
}

// login 
const loginController=async(req,res)=>{
   try{
       const {email,password}=req.body;
       if(!email || !password){
            return res.status(500).send({
            success:false,
            message:"please fill all the field"
         })
       }
       const user=await userModel.findOne({email});
       if(!user){
         return res.status(400).send({
            success:false,
            message:"user not found"
         })
       }
      //  match password
      const isMatch=await comparePassword(password,user.password);
      if(!isMatch){
         return res.status(400).send({
            success:false,
            message:"invalid username or password"
         })
      }
      // JWT Token
      const token=JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});

      // set password as undefined
      user.password=undefined;
      res.status(200).send({
        success:true,
        message:"Login successful",
        token,
        user,
      })

   }catch(error){
      return res.status(500).send({
        success:false,
        message:"Error in login Api",
        error
      })
   }
}

// update user
const updateController =async(req,res)=>{
    try{
        const {name,password,email}=req.body;
        // find existing user
        const user=await userModel.findOne({email});  
        // password validation
        if(password){
            if(password.length <4){
                return res.status(400).send({
                    success:false,
                    message:"password must be atleast 4 character long"
                 })  
            }
        }
      const hashedPassword = password? await hashPassword(password):undefined;
      //  updated user
      const updatedUser=await userModel.findOneAndUpdate({email},{name:name||user.name,password:hashedPassword||user.password},{new:true});
      updatedUser.password=undefined;
      
      res.status(200).send({
        success:true,
        message:"Profile updated successfully please Login",
        user:updatedUser
      }) 
    }catch(error){
      return res.status(500).send({
         success:false,
         message:"Error in Update Api",
         error
       })
    }
}
module.exports={requireSignIn,registerController,loginController,updateController};