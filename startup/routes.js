const express = require('express');
const { users } = require('../routes/users');

module.exports = function (app) {

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Hello World! Jatin");
    });

    app.use("/api/users", users);
}