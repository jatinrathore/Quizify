const express = require('express');
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {

        //Validating user object from request body
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        //Checking if Email is valid or not
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        //Checking if Email is not verified
        if (!user.verified) return res.status(403).send({ message: "Email is not Verified", userId: user._id });

        //Matching password with hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();

        res.cookie("quizify-token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            // sameSite: 'none', // Setting SameSite attribute to None
            secure: true,     // Ensuring the cookie is sent over HTTPS
            httpOnly: true
        }).status(200).send({
            data: token, message: "Logged in Successfully", response: {
                status: 200
            }
        });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Auth' });

    }
});

function validateUser(user) {
    const schema = {
        email: Joi.string().required().min(15).max(255).email(),
        password: Joi.string().required().min(8).max(255),
    };

    return Joi.validate(user, schema);
}

exports.auth = router;