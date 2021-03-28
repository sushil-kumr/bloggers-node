const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
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

module.exports = Checkout = mongoose.model('checkout',CheckoutSchema);