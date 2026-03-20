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
        if (user) return res.status(409).send({ message: "An account with this email address already exists." });

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

        res.status(201).send({ message: "Account created successfully! Please check your email to verify.", response: { status: 201 }, userId: user._id });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });

    }
});

router.post("/verify-email", async (req, res) => {

    try {

        const { userId, otp } = req.body;

        if (!userId || !otp) return res.status(400).send({ message: "Please provide both User ID and OTP.", response: { status: 400 } });

        if (!isValidObjectId(userId)) return res.status(400).send({ message: "Invalid verification link. Please request a new one.", response: { status: 400 } });

        const user = await User.findOne({ _id: userId });

        if (!user) return res.status(404).send({ message: "We couldn't find your account. Please sign up again.", response: { status: 404 } });

        const tokenOwner = await OtpVerification.findOne({ owner: user._id });

        if (!tokenOwner) return res.status(404).send({ message: "Verification code has expired. Please request a new one.", response: { status: 404 } });

        const isMatched = await tokenOwner.compareToken(otp);

        if (!isMatched) return res.status(401).send({ message: "Incorrect OTP. Please check and try again.", response: { status: 401 } });

        user.verified = true;

        await OtpVerification.findByIdAndDelete(tokenOwner._id);
        await user.save();

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Your Email Address is Verified",
            html: generateVerifyTemplate(user.name),
        });

        res.status(200).send({ message: "Email verified successfully! You can now log in.", response: { status: 200 } })

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });

    }
});

router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) return res.status(400).send({ message: "Please enter your email address.", response: { status: 400 } });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).send({ message: "No account found with this email address.", response: { status: 404 } });

        const token = await ResetToken.findOne({ owner: user._id });

        if (token) return res.status(409).send({ message: "A reset link was already sent. Please check your email or try again in one hour.", response: { status: 409 } });

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

        res.status(200).send({ message: "Password reset link has been sent to your email.", response: { status: 200 } });
    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
});

router.post("/reset-password", isResetTokenValid, async (req, res) => {

    try {
        const { password } = req.body;

        if (!password) return res.status(400).send({ message: "Please enter a new password." });

        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).send({ message: "Account not found. Please try again." });

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (isSamePassword) return res.status(400).send({ message: "New password must be different from your current password." });

        if (password.trim().length < 8) return res.status(400).send({ message: "Password must be at least 8 characters long." });

        user.password = password.trim();

        await user.save();

        await ResetToken.findOneAndDelete({ owner: user._id });

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Password Reset Successfully",
            html: generateSuccessTemplate(),
        });

        res.status(200).send({ message: "Password has been reset successfully!", response: { status: 200 } });

    } catch (error) {

        console.error(error);
        res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
});

exports.users = router;