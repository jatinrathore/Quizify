const router = require("express").Router();
const passport = require("passport")
const jwt = require("jsonwebtoken");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }),
    (req, res) => {
        const token = req.user.generateAuthToken();
        console.log(token);
    });


exports.googleAuth = router;  