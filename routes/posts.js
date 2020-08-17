var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 

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
    Post.findById(req.params.id).populate('user', 'name picture' )
      .exec(function (err, post) {
      if (err) return res.status(500).json({message: err.message})
      if(!post) return res.status(404).json({message: 'Post with id :( ' +req.params.id+ ' )is not fount' })


      Post.populate(post.comments, {path: 'user', select: 'name picture'}, (err, doc) => {
        if(err) return res.status(500).json({message: err.message})
        res.status(200).json(post)
      })

    })
  });

  // =============================== 
  // Add Post
  router.post('/', function(req,res) {
   var newPost = new Post({content: req.body.content , comments: [] ,likes: [], user: req.body.user_id });
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


// Likes
router.put('/:id/like' , function(req, res) {
  
  Post.findById(req.params.id).then(post => {
    post.likes.includes(req.body.userId) ?  post.likes.pull(req.body.userId) :  post.likes.push(req.body.userId)     
    post.save(function (err) {
      if(err) {
          console.error('ERROR!');
          res.status(500).json({message : err.message});
      }
    });

    res.status(200).json({numberOfLikes: post.likes.length});
  })
  // Post.findByIdAndUpdate(req.params.id , {  $addToSet : { likes : { userId: req.body.userId} } }).then(post =>{
  //   if(!post) return res.status(404).json({message: 'Post with id :( ' +req.params.post_id+ ' )is not found to be liked' });

  //   console.log(post.likes);
  //   res.status(200).json({message: 'Like added successfully'})
  // }).catch(err => {
  //   res.status(500).json({message : err.message});
  // })
})

module.exports = router;
