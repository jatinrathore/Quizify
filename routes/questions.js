const express = require('express');
const { Questions } = require('../models/questions');
const { log } = require('console');

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const questions = await Questions.find();

        if (!questions) res.status(404).send("Unable to fetch data from server!");

        res.status(200).send(questions)
    } catch (error) {
        console.log(error.message);
    }

});

router.get("/:topicName", async (req, res) => {

    try {
        const data = await Questions.find({ topicName: req.params.topicName });

        if (!data) res.status(404).send("Unable to fetch data from server!");

        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
    }
});

exports.questions = router;