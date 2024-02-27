const express = require('express');
const { users } = require('../routes/users');
const { auth } = require('../routes/auth');
const { questions } = require("../routes/questions");
const { googleAuth } = require("../routes/googleAuth")

module.exports = function (app) {
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/questions", questions);
    app.use("/auth", googleAuth);
}
