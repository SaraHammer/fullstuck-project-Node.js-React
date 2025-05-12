const mongoose = require('../MongodbConnection');

const matchMakerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

const MatchMakerModel = mongoose.model("match_makers", matchMakerSchema);

module.exports = MatchMakerModel;