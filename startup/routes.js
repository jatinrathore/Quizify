const express = require('express');
const { users } = require('../routes/users');
const { auth } = require('../routes/auth');
const { questions } = require("../routes/questions");
module.exports = function (app) {

    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/questions", questions)
}
