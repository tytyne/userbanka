const { Withdraw, validate } = require('../models/withdraw');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this account number already exists
    let withdraw = await Withdraw.findOne({ accnumber: req.body.accnumber });
    if (withdraw) {
        // withdraw the money if the account exist 
            withdraw = new Withdraw({
            accountName: req.body. accountName,
            email: req.body.email,
            dateOftoday:req.body.dateOftoday,
            accnumber:req.body.accnumber,
            amount: req.body.amount
        });
        await withdraw.save();
        res.send(withdraw);

    }
    else {
        
        return res.status(400).send({ error: 'That account number does not exists!' });
           
       
    }
});
 
module.exports = router;