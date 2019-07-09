//const Joi = require('joi');
const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    name: {
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


    district: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    cell: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    sector: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    birthdate: {
        type: Date,
        required: true
        
    },

    accountCreationDate: {
        type: Date,
        required: true
        
    },

    phoneNumber: {
        type: Number,
        required: true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));
 
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        district: Joi.string().min(5).max(50).required(),
        cell: Joi.string().min(5).max(50).required(),
        sector: Joi.string().min(5).max(50).required(),
        birthdate: Joi.date().format('YYYY-MM-DD').required(),
        accountCreationDate:Joi.date().format('YYYY-MM-DD').required(),
        phoneNumber: Joi.number().required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;