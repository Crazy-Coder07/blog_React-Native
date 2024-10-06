const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { 
    createPostController, 
    getAllPostController, 
    getUserPostController, 
    deleteUserPostController,
    updatePostController
} = require('../controllers/postController');

// router object
const router = express.Router();

// create post
router.post('/create-post', requireSignIn,createPostController);

// get all posts
router.get('/get-all-post',getAllPostController);

// get user posts
router.get('/get-user-post',requireSignIn,getUserPostController);

// delete user posts
router.delete('/delete-post/:id',requireSignIn,deleteUserPostController)

// update user posts
router.put('/update-post/:id',requireSignIn,updatePostController)

// export 
module.exports =router;