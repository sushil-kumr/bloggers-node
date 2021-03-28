const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }  
}); 

module.exports = Menu = mongoose.model('menu',MenuSchema);