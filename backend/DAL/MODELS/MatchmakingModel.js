const mongoose = require('../MongodbConnection');

const matchMakerSchema = new mongoose.Schema({
    boyFirstName: String,
    boyLastName: String,
    girlFirstName: String,
    girlLastName: String,
    carriedOut: Boolean,
    matchMaker: String,
    date: String
});

const MatchmakinglModel = mongoose.model("matchmaking", matchMakerSchema);

module.exports = MatchmakinglModel;