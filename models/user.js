const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 15,
        maxlength: 255,
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ email: this.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: "7d" });
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(4).max(50),
        email: Joi.string().required().min(15).max(255).email(),
        password: Joi.string().required().min(8).max(255),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
