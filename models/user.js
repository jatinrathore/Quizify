const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        maxlength: 255,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, Number(process.env.SALT));
        this.password = hashedPassword;
    }
    next();
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ email: this.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: "2d" });
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(4)
            .max(50)
            .trim()
            .label("Name")
            .messages({
                "string.empty": "Please enter your name",
                "string.min": "Name must be at least {#limit} characters",
                "string.max": "Name cannot exceed {#limit} characters",
                "any.required": "Please enter your name",
            }),
        email: Joi.string()
            .required()
            .min(15)
            .max(255)
            .email()
            .label("Email")
            .messages({
                "string.empty": "Email address is required",
                "string.email": "Please enter a valid email address",
                "string.min": "Email must be at least {#limit} characters",
                "string.max": "Email cannot exceed {#limit} characters",
                "any.required": "Email address is required",
            }),
        password: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label("Password")
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least {#limit} characters",
                "string.max": "Password cannot exceed {#limit} characters",
                "any.required": "Password is required",
            }),
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
