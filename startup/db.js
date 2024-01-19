const mongoose = require('mongoose');

module.exports = function () {
    const db = "mongodb://127.0.0.1/quiz-e-meter";

    mongoose
        .connect(db)
        .then(() => console.log("Successfully connected to MongoDB..."))
        .catch((error) => {
            console.error("MongoDb is unable to connect. Check your MongoDB server or connection string.");
        });


};