const matchMakerModel = require('../MODELS/MatchMakerModel');

class MatchMakerRepository {
    async get() {
        return await matchMakerModel.find();
    }
    async addMatchMaker(matchMaker) {
        const newMatch = new matchMakerModel(matchMaker);
        await newMatch.save();
        return newMatch;
    }
    async deleteMatchMaker(id){
        let result = await matchMakerModel.findOne({ "_id": id });
        if(result){
            return await matchMakerModel.findOneAndDelete({ "_id": id });
         }
         else
             return null;
    }
}
let matchMakerRepository = new MatchMakerRepository();
module.exports = matchMakerRepository;