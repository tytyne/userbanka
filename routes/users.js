const bcryptjs = require('bcryptjs');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            district: req.body.district,
            cell: req.body.cell,
            sector: req.body.sector,
            birthdate: req.body.birthdate,
            accountCreationDate:req.body. accountCreationDate,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        });
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});
 
module.exports = router;