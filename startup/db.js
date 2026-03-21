const mongoose = require('mongoose');

const getMongoUrl = () => {
    if (process.env.NODE_ENV !== 'production') return process.env.DB;

    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);
    return `mongodb+srv://${username}:${password}@cluster0.zdspggv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
};

module.exports.getMongoUrl = getMongoUrl;

module.exports.connectDb = function () {
    const url = getMongoUrl();
    mongoose
        .connect(url)
        .then(() => console.log(`Successfully connected to MongoDB at ${url.split('@')[0]}...`))
        .catch((error) => {
            console.error("MongoDb is unable to connect.", error);
        });
};