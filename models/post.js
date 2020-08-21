var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes : [String],
    comments: [{ 
        content: String ,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created_at : { type: Date, required: true, default: Date.now }
    }],
    user: { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User',
        required: true,
    },
    category: {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Category',
        required: true,
    }
}, {versionKey : false , timestamps: true});

module.exports = mongoose.model('Post' , postSchema);