const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:""
    },
    code:{
        type:String,
        default:""
    },
    state:{
        type:String,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now,
    }  
}); 

module.exports = Payment = mongoose.model('payment',PaymentSchema);