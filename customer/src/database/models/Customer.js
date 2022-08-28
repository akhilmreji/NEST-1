const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountno:{
        type: String,
        required: true
    },
    salt: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
        // required: true
    },
    transaction: [{type: String , timestamps: true }]
});

module.exports =  mongoose.model('customer', CustomerSchema);