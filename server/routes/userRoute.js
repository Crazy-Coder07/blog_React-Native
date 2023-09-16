const express=require("express");
const { 
    registerController,
    loginController, 
} = require("../controllers/userController");

// router object
const router=express.Router();

// routes
router.post('/register',registerController)
router.post('/login',loginController);

module.exports=router;