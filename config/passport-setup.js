const passport = require('passport');
const { User } = require('../models/user');
let GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({ email: email });
    done(null, user);
})

passport.use(new GoogleStrategy({
    //options for google strategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    //passport callback function

    //checking if user is already in database
    let user = await User.findOne({ email: profile._json.email });

    if (!user) {

        const systemGenPassword = profile._json.given_name + "@" + profile._json.sub;

        user = await new User({
            name: profile._json.name,
            email: profile._json.email,
            password: systemGenPassword,
            verified: profile._json.email_verified
        }).save();
    }

    console.log("User logged in");

    return done(null, user);
}));