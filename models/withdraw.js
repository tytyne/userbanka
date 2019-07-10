const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const mongoose = require('mongoose');
 
const Withdraw = mongoose.model('Withdraw', new mongoose.Schema({
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



    dateOftoday: {
        type: Date,
        required: true
        
    },

  accnumber: {
        type: Number,
        required: true
        
    },
    amount: {
        type: Number,
        required: true
        
    }
}));
 
function validateWithdraw(withdraw) {
    const schema = {
        accountName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        dateOftoday:Joi.date().format('YYYY-MM-DD').required(),
        accnumber:Joi.number().required(),
        amount: Joi.number().required(),
        
    };
    return Joi.validate(withdraw, schema);
}
 

exports.Withdraw = Withdraw;
exports.validate = validateWithdraw;