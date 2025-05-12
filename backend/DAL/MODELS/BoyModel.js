const mongoose = require('../MongodbConnection');

const boySchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    belonging: String,
    yeshiva: String
});

const boysModel = mongoose.model("Boy", boySchema, "boys");

module.exports = boysModel;

