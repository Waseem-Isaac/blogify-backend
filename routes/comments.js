var express = require('express');
var router = express.Router();
var Post = require('../models/post')
var ObjectId = require('mongodb').ObjectId; 
 
  // =============================== 
  // Add Comment
  router.post('/:post_id', function(req,res) {
    if(!req.body.content) {
      return res.status(400).send({
          message: "comment content can not be empty"
      });
    }else if(!req.body.user_id) {
      return res.status(400).send({
        message: "user Id can not be empty"
      });
    } 
    Post.findByIdAndUpdate(req.params.post_id , {  $push : { comments : {_id: ObjectId() , content: req.body.content, user: req.body.user_id} } }).then(post =>{
      if(!post) return res.status(404).json({message: 'Post with id :( ' +req.params.post_id+ ' )is not found' });
      res.status(200).json({message: 'Comment added successfully'})
    }).catch(err => {
      res.status(500).json({message : err.message});
    })
  })

  // =============================== 
  // Update Comment by id
  router.put('/:post_id/:comment_id', function(req, res) {
    if(!req.body.content) {
      return res.status(400).send({
          message: "comment content can not be empty"
      });
    }  
    Post.updateOne({_id : ObjectId(req.params.post_id) , 'comments._id' : ObjectId(req.params.comment_id)}, {
      $set : { 'comments.$.content' : req.body.content}
    }).then(() => {
      res.status(200).json({message : 'Comment updated succesffuly'});
    }).catch(err => {
      res.status(500).json({message: err.message});
    })
  })

  // =============================== 
  // Delete Comment by id
  router.delete('/:post_id/:comment_id', function(req, res) {
    Post.updateOne({_id : ObjectId(req.params.post_id)}, {
      $pull : { comments : {_id : ObjectId(req.params.comment_id)}}
    }).then((result) => {
      if(!result.nModified) return res.status(404).json({message: 'Post or comment is not found' });
      res.status(200).json({message : 'Comment deleted succesffuly'});
    }).catch(err => {
      res.status(500).json({message: err.message});
    })
  })



module.exports = router;
