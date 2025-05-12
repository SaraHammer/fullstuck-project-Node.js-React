const mongoose = require('../MongodbConnection');

const girlSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    belonging: String,
    specialisation: String
});

const GirlModel = mongoose.model("girls", girlSchema);

module.exports = GirlModel;