const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,'amount is required'],
    },
    type: {
        type:String,
        required:[true,'type is required'],
    },
    category:{
        type:String,
        required:[true,'category is required'],
    },
    reference: {
        type: String,
    },
    description:{
        type:String,
    },
    date: {
        type: String,
        required:[true,'date is required'],
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref:'users',
        required:[true,'addedBy is required'],
    }
},
{ timestamps: true }
);

const transactionModel = mongoose.model('transactions',transactionSchema);
module.exports = transactionModel