const express = require('express');
const { validate, User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {

    try {

        //Validating user object from request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Checking for existing user in database
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered!");

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Creating new user and saving it in database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        user = await user.save();

        res.send(user);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Users<Post>' });

    }
});

router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })

        if (!user) return res.status(404).send("User not found!")

        res.send(user);
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - Users<Get>' });

    }
});
exports.users = router;