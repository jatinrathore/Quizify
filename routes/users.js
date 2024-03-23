const express = require('express');
const { validate, User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { OtpVerification } = require('../models/otpVerification');
const { generateOTP, mailTransport, generateTemplate, generateVerifyTemplate, generateResetPasswordTemplate, generateSuccessTemplate } = require('../util/mail');
const { isValidObjectId } = require('mongoose');
const { ResetToken } = require('../models/resetToken');
const { createRandomBytes } = require('../util/helper');
const { isResetTokenValid } = require('../middlewares/isResetTokenValid');

router.post("/", async (req, res) => {

    try {

        //Validating user object from request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        //Checking for existing user in database
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User already registered!" });

        //Creating new user and saving it in database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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

router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) return res.status(204).send({ message: "Invalid request: email is missing.", response: { status: 204 } });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).send({ message: "User not found", response: { status: 404 } });

        const token = await ResetToken.findOne({ owner: user._id });

        if (token) return res.status(409).send({ message: "Token already present, you can request for new one after one hour", response: { status: 409 } });

        const randomBytes = await createRandomBytes();

        const resetToken = new ResetToken({ owner: user._id, resetToken: randomBytes });

        await resetToken.save();

        const url = `${process.env.CLIENT_URL}/reset-password?token=${randomBytes}&id=${user._id}`;

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Reset Password Request",
            html: generateResetPasswordTemplate(url),
        });

        res.status(200).send({ message: "Password reset link is sent", response: { status: 200 } });
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Forgot-Password<Post>' });
    }
});

router.post("/reset-password", isResetTokenValid, async (req, res) => {

    try {
        const { password } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).send({ message: "User not found - Reset Password" });

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (isSamePassword) return res.status(400).send("New password must be different!");

        user.password = password.trim();

        await user.save();

        await ResetToken.findOneAndDelete({ owner: user._id });

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Password Reset Successfully",
            html: generateSuccessTemplate(),
        });

        res.status(200).send({ message: "Password Reset Successfully!", response: { status: 200 } });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - Reset-Password<Post>' });
    }
});

exports.users = router;