var mongoose = require('mongoose');

const categotySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
}, {versionKey : false });

module.exports = mongoose.model('Category' , categotySchema);