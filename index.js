require("dotenv").config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const passport = require("passport");
const path = require("path");
require("./config/passport-setup");


const cookieParser = require('cookie-parser');
app.use(cookieParser());

//middlewares
app.use(session({
  secret: process.env.JWT_PRIVATE_KEY, // Replace with your actual secret key
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());

// app.use(cors({
//   origin: true,
//   credentials: true
// }));

// Allow requests from a specific domain
const whitelist = ['https://quizify-learning.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Allowed by CORS");
      callback(null, true);
    } else {
      console.log("Not allowed by CORS");
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Enable CORS with options
app.use(cors(corsOptions));

// Configure Passport strategies and routes...
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./startup/routes")(app);

//database connection
require("./startup/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
