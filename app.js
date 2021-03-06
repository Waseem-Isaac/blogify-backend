var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var auth = require('./routes/auth')
var users = require('./routes/users');
var posts = require('./routes/posts');
var categories = require('./routes/categories');
var comments = require('./routes/comments');
var isAuthenticated = require('./shared/isAuthenticated');
const { uploadMiddleWare, upload } = require('./shared/upload');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users);
app.use('/api/v1/posts', isAuthenticated, posts);
app.use('/api/v1/comments', isAuthenticated, comments);
app.use('/api/v1/categories', isAuthenticated, categories);

app.post('/api/v1/upload' , upload.single('image'), uploadMiddleWare)


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})
module.exports = app;
