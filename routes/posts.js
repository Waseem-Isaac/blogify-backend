var express = require('express');
var router = express.Router();
var Post = require('../models/post');
const post = require('../models/post');

  // =============================== 
  // Get all posts
  router.get('/', function(req, res, next) {
    Post.find().populate('user', 'name picture' ).exec(function (err, posts) {
      if (err) return res.status(500).json({message: err.message})
      res.status(200).json(posts.filter(p => p.user))
    })
  });

  // =============================== 
  // Get post by id 
  router.get('/:id' , (req , res ) => {
    Post.findById(req.params.id).then(post =>  { 
      if(!post) return res.status(404).json({message: 'Post with id :( ' +req.params.id+ ' )is not fount' })
      res.status(200).json(post) 
    }).catch(err => res.status(500).json({message: err.message}));
  });

  // =============================== 
  // Add Post
  router.post('/', function(req,res) {
   var newPost = new Post({content: req.body.content , comments: [] , user: req.body.user_id });
   Post.create(newPost).then((result) => {
     res.status(200).json({message: 'Post added successfully' , post: result});
   }).catch(err => {
     res.status(500).json({message: err.message});
   })
  })

  // =============================== 
  // Update post by id
  router.put('/:id', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, {content: req.body.content}, {runValidators: true}).then(result => {
      if(!result) return res.status(404).json({message: 'Post with id :( ' +req.params.id+ ' )is not found' })
      res.status(200).json({message: 'Post updated successfully', post: result});
    }).catch(err => {
      res.status(500).json({message: err.message});
    })
  })

  // =============================== 
  // Delete post by id
  router.delete('/:id', function(req, res) {
    Post.findByIdAndDelete(req.params.id).then(result => {
      if(!result) return res.status(404).json({message: 'Post with id :( ' +req.params.id+ ' )is not found' })
      res.status(200).json({message: 'Post deleted successfully', post: result});
    }).catch(err => {
      res.status(500).catch({message: err.message});
    })
  })


module.exports = router;
