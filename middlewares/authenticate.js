const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header(process.env.QUIZIFY_AUTH_TOKEN_KEY);

    if (!token) return res.status(401).send("Access Denied! . Token is not provided");

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}