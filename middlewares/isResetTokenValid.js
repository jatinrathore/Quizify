const { isValidObjectId } = require("mongoose");
const { User } = require("../models/user");
const { ResetToken } = require("../models/resetToken");

exports.isResetTokenValid = async (req, res, next) => {

    try {
        const { token, id } = req.query;

        if (!token || !id) return res.status(401).send("Access Denied!. Token or Id is not provided");

        if (!isValidObjectId(id)) return res.status(400).send("Invalid id!");

        const user = await User.findById(id);

        if (!user) return res.status(404).send("User not found!");

        const resetToken = await ResetToken.findOne({ owner: user._id });

        if (!resetToken) return res.status(404).send("Reset Token not found!");

        const isValid = await resetToken.compareToken(token);

        if (!isValid) return res.status(401).send("Reset Token is not valid!")

        req.user = user;
        next();

    } catch (error) {
        res.status(400).send(error.message);
    }
}