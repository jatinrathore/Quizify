const mongoose = require('mongoose');

const submitQuestionsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
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

function validateSubmitQuestionsSchema(schema) {
    const validatorSchema = Joi.Object({
        owner: Joi.string().required(),
        questionTitle: Joi.string().required().min(15).max(1000),
        options: Joi.array().items(Joi.string()).required().min(4).max(4),
        answer: Joi.string().required().min(1).max(500),
        topicName: Joi.string().required().min(1).max(50),
        difficultyLevel: Joi.string().required().min(4).max(50)
    });

    return validateQuestionsSchema.validate(schema);
}

const SubmitQuestions = mongoose.model("Submit Questions", submitQuestionsSchema);

exports.SubmitQuestions = SubmitQuestions;

exports.validateSubmittedQuestionsSchema = validateSubmitQuestionsSchema;