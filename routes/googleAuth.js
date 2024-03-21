const router = require("express").Router();
const passport = require("passport")
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }), function (req, res) {
    // Successful authentication, redirect home.
    const token = req.user.generateAuthToken();
    console.log("Token Generated");
    res.cookie("quizify-token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none', // Setting SameSite attribute to None
        secure: true,     // Ensuring the cookie is sent over HTTPS
        domain: ['.netlify.app', '.vercel.app']
    }).redirect(process.env.CLIENT_URL)
});


exports.googleAuth = router;  