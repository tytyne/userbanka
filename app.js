
// app.js
//const Joi = require('joi');
const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
 
// Set up mongoose connection

let dev_db_url='mongodb+srv://tytyne:tytyne123@cluster0-6mwui.mongodb.net/test?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser:true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.json());
app.use('/signup/users', users);
app.use('/login/auth', auth);
let port =process.env.PORT|| 5000;
app.listen(port, () => {
    console.log('Server is up and running on port  ' + port);
});
