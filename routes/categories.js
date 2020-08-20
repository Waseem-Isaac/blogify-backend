var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 
var Category = require('../models/category');
const post = require('../models/post');

  // =============================== 
  // Get all Categories
  router.get('/', function(req, res, next) {
    Category.find().then(categories => {
        res.status(200).json(categories);
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
  });

module.exports = router;
