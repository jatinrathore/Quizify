const express = require('express');
const { validate, User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {

    try {

        //Validating user object from request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        //Checking for existing user in database
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User already registered!" });

        //hashing password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Creating new user and saving it in database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        user = await user.save();

        res.status(201).send({ message: "User created successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Users<Post>' });

    }
});

exports.users = router;