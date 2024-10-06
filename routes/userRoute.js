const express=require("express");
const { 
    registerController,
    loginController,
    updateController,
    requireSignIn, 
} = require("../controllers/userController");

// router object
const router=express.Router();

// routes
router.post('/register',registerController)
router.post('/login',loginController);
// update user pofile
router.put('/update-user',requireSignIn,updateController);

module.exports=router;