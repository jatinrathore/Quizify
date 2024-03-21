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
app.use(cors({
  origin: true,
  credentials: true
}));


// Configure Passport strategies and routes...
app.use(passport.initialize());
app.use(passport.session());

// Deployment 
// const curDir = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(curDir, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(curDir, "frontend", "dist", "index.html"));
//   });
// }

//routes
require("./startup/routes")(app);

//database connection
require("./startup/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
