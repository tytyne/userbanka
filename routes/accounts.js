
const { Account, validate } = require('../models/account');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this account user already exists
    let account = await Account.findOne({ email: req.body.email });
    if (account) {
        return res.status(400).send({ error: 'That account user already exists!' });
    } else {
        // create a new account if doesn't  not exist yet
        account = new Account({
            accountName: req.body. accountName,
            email: req.body.email,
            status: req.body.status,
            type: req.body.type,
            accountCreationDate:req.body. accountCreationDate,
            amount: req.body.amount,
           
        });
        
        await account.save();
        res.send(account);
    }
});
 
module.exports = router;