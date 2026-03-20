const mongoose = require('mongoose');

module.exports = function () {

    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);

    const url = process.env.DB || `mongodb+srv://${username}:${password}@cluster0.zdspggv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose
        .connect(url)
        .then(() => console.log(`Successfully connected to MongoDB at ${url.split('@')[0]}...`))
        .catch((error) => {
            console.error("MongoDb is unable to connect. Check your MongoDB server or connection string.", error);
        });

};


// I want to change theme color of this project there is pink color variants in my all over frontend i want to change it and make something more beautiful add light and dark mode  and make ui beautiful in quiz also loading is in top left provide a beautiful loading and on result screen also show results beautifully