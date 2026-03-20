const mongoose = require('mongoose');

module.exports = function () {

    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);

    const isDev = process.env.NODE_ENV !== 'production';

    const url = isDev ? process.env.DB : `mongodb+srv://${username}:${password}@cluster0.zdspggv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose
        .connect(url)
        .then(() => console.log(`Successfully connected to MongoDB at ${url.split('@')[0]}...`))
        .catch((error) => {
            console.error("MongoDb is unable to connect. Check your MongoDB server or connection string.", error);
        });

};
