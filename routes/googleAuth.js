const router = require("express").Router();
const passport = require("passport")
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }), function (req, res) {
    // Successful authentication, redirect home.
    const token = req.user.generateAuthToken();
    console.log("Token Generated");
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`)
});


exports.googleAuth = router;  