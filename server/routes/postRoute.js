const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostController } = require('../controllers/postController');

// router object
const router = express.Router();

// create post
router.post('/create-post', requireSignIn,createPostController);

// get all posts
router.get('/get-all-post',getAllPostController);
// export 
module.exports =router;