const express = require('express');
const { users } = require('../routes/users');
const { auth } = require('../routes/auth');
module.exports = function (app) {

    app.get("/", (req, res) => {
        res.send("Hello World! Jatin");
    });

    app.use("/api/users", users);
    app.use("/api/auth", auth);
}
