const express = require('express');
const { Questions } = require('../models/questions');
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        let query = {};

        if (req.query.topicName) {
            query = { topicName: req.query.topicName };
        }

        const totalQuestions = await Questions.countDocuments(query);
        const totalPages = Math.ceil(totalQuestions / pageSize);

        const questions = await Questions.find(query).skip(skip).limit(pageSize);

        if (!questions) {
            return res.status(404).send("Unable to fetch data from server!");
        }

        res.status(200).send({ questions, totalPages });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});

exports.questions = router;