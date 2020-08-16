var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes : {
        type: [String],
    },
    comments: [{ content: String }],
    user: { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User',
        required: true
    },
    
}, {versionKey : false });

module.exports = mongoose.model('Post' , postSchema);