const express = require('express');
const { validate, User } = require('../models/user');
const router = express.Router();

router.post("/", async (req, res) => {

    try {

        //Validating user object from request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Checking for existing user in database
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered!");


        //Creating new user and saving it in database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        user = await user.save();

        res.send(user);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Users' });

    }
});

exports.users = router;