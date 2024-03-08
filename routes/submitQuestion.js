const express = require('express');
const { validateSubmittedQuestionsSchema, SubmitQuestions } = require('../models/submitQuestion');
const { generateQuestionSubmitTemplate } = require('../util/mail');

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { error } = validateSubmittedQuestionsSchema(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const questionObject = req.body;

        const alreadyInDB = await SubmitQuestions.find({ questionTitle: questionObject.questionTitle });

        if (alreadyInDB) return res.status(409).send({ message: "Question Already In Database" });

        const question = new SubmitQuestions({
            owner: questionObject.owner,
            questionTitle: questionObject.questionTitle,
            answer: questionObject.answer,
            options: questionObject.options,
            topicName: questionObject.topicName,
            difficultyLevel: questionObject.difficultyLevel
        })

        await question.save();

        mailTransport().sendMail({
            from: "quizify.admin@gmail.com",
            to: user.email,
            subject: "Congrats! Your Question is Submitted for Review",
            html: generateQuestionSubmitTemplate(),
        });

        res.status(200).send({ message: "Question Submitted Successfully!", response: { status: 200 } });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error - SubmitUser<Post>' });
    }
});

exports.submitQuestion = router;