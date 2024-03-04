const express = require('express');
const { validate, User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { OtpVerification } = require('../models/otpVerification');
const { generateOTP, mailTransport, generateTemplate, generateVerifyTemplate } = require('../util/mail');
const { isValidObjectId } = require('mongoose');

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

        //generating OTP and saving it in database
        const OTP = generateOTP();

        const otpVerifyToken = new OtpVerification({
            owner: user._id,
            otpToken: OTP
        });

        await otpVerifyToken.save();
        user = await user.save();

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Activate Your Account - Verify Your Email",
            html: generateTemplate(OTP),
        });

        res.status(201).send({ message: "User created successfully", response: { status: 201 }, userId: user._id });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Users<Post>' });

    }
});

router.post("/verify-email", async (req, res) => {

    try {

        const { userId, otp } = req.body;

        if (!userId || !otp) return res.status(400).send({ message: "Invalid request: User ID or OTP is missing.", response: { status: 400 } });

        if (!isValidObjectId(userId)) return res.status(400).send({ message: "Invalid User Id", response: { status: 400 } });

        const user = await User.findOne({ _id: userId });

        if (!user) return res.status(404).send({ message: "User not found", response: { status: 404 } });

        const tokenOwner = await OtpVerification.findOne({ owner: user._id });

        if (!tokenOwner) return res.status(404).send({ message: "Owner<User> not found", response: { status: 404 } });

        const isMatched = await tokenOwner.compareToken(otp);

        if (!isMatched) return res.status(401).send({ message: "Wrong OTP!", response: { status: 401 } });

        user.verified = true;

        await OtpVerification.findByIdAndDelete(tokenOwner._id);
        await user.save();

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Your Email Address is Verified",
            html: generateVerifyTemplate(user.name),
        });

        res.status(200).send({ message: "Email Verified", response: { status: 200 } })

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Verify-Emails<Post>' });

    }
});

exports.users = router;