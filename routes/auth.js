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
        if (!user) return res.status(401).send({ message: "Invalid email or password. Please check your credentials." });

        //Checking if Email is not verified
        if (!user.verified) return res.status(403).send({ message: "Please verify your email before logging in.", userId: user._id });

        //Matching password with hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid email or password. Please check your credentials." });

        const token = user.generateAuthToken();

        res.cookie("quizify-token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        }).status(200).send({
            data: token, message: "Logged in successfully!", response: {
                status: 200
            }
        });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });

    }
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .min(15)
            .max(255)
            .email()
            .label("Email")
            .messages({
                "string.empty": "Email address is required",
                "string.email": "Please enter a valid email address",
                "string.min": "Email must be at least {#limit} characters",
                "any.required": "Email address is required",
            }),
        password: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label("Password")
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least {#limit} characters",
                "any.required": "Password is required",
            }),
    });

    return schema.validate(user);
}

exports.auth = router;