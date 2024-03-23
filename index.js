require("dotenv").config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const passport = require("passport");
const path = require("path");
require("./config/passport-setup");
const { createProxyMiddleware } = require('http-proxy-middleware');


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

// Define the endpoint you want to proxy
const apiProxy = createProxyMiddleware('/api', {
  target: 'https://quizify-pt2a.onrender.com', // Change this to your backend URL
  changeOrigin: true,
  secure: true // Set it to true if your backend URL is HTTPS and has a valid certificate
});

// Proxy API requests
app.use(apiProxy);


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
