require("dotenv").config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const passport = require("passport");
require("./config/passport-setup");


//middlewares
app.use(express.json());
app.use(cors());
app.use(session({
  secret: process.env.JWT_PRIVATE_KEY, // Replace with your actual secret key
  resave: false,
  saveUninitialized: false
}));

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
