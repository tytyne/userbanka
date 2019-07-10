//const Joi = require('joi');
const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const mongoose = require('mongoose');
 
const Account = mongoose.model('Account', new mongoose.Schema({
    accountName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },


    status: {
        type: String,
        minlength: 5,
        maxlength: 50
    },

    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    accountCreationDate: {
        type: Date,
        required: true
        
    },

    amount: {
        type: Number,
        required: true
        
    }
}));
 
function validateAccount(account) {
    const schema = {
        accountName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        status: Joi.string().min(5).max(50),
        type: Joi.string().min(5).max(50).required(),
        accountCreationDate:Joi.date().format('YYYY-MM-DD').required(),
        amount: Joi.number().required(),
        
    };
    return Joi.validate(account, schema);
}
 

exports.Account = Account;
exports.validate = validateAccount;