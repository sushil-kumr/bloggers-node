const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    videoLink:{
        type:String,
        default:"",
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }  
}); 

module.exports = Article = mongoose.model('article',ArticleSchema);