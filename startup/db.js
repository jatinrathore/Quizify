const mongoose = require('mongoose');

module.exports = function () {
    mongoose
        .connect(process.env.DB)
        .then(() => console.log("Successfully connected to MongoDB..."))
        .catch((error) => {
            console.error("MongoDb is unable to connect. Check your MongoDB server or connection string.");
        });


};