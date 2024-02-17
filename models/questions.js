const mongoose = require('mongoose');
const Joi = require("joi");
const questionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50,
    },
    questionTitle: {
        type: String,
        required: true,
        trim: true,
        minlength: 15,
        maxlength: 1000,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length === 4;
            },
            message: "Options must have exactly 4 elements!"
        }
    },
    answer: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500,
    },
    points: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
    },
    topicName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    difficultyLevel: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50,
    }
});

function validateQuestionsSchema(schema) {
    const validatorSchema = Joi.Object({
        questionId: Joi.string().required().min(4).max(50),
        questionTitle: Joi.string().required().min(15).max(1000),
        options: Joi.array().items(Joi.string()).required().min(4).max(4),
        answer: Joi.string().required().min(1).max(500),
        points: Joi.number().required().min(1).max(4),
        topicName: Joi.string().required().min(1).max(50),
        difficultyLevel: Joi.string().required().min(4).max(50)
    });

    return validateQuestionsSchema.validate(schema);
}

const Questions = mongoose.model("Questions", questionSchema);

exports.Questions = Questions;
exports.validateQuestion = validateQuestionsSchema;