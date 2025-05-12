const matchmakingModel = require('../MODELS/MatchmakingModel');

class MatchmakingRepository {
    async get() {
        return await matchmakingModel.find();
    }
    // async getByResult(result) {
    //     return await matchmakingModel.find({"carriedOut":result});
    // }
    async getByMatchMaker(matchMaker) {
        return await matchmakingModel.find({"matchMaker":matchMaker});
    }
    async addMatchMaking(matchMaking) {
        
        const newMatchMaking = new matchmakingModel(matchMaking);
        await newMatchMaking.save();
        return newMatchMaking;
    }
    async updateMatchMaking(id, matchMaking) {
        let result = await matchmakingModel.findOne({ "_id": id });
        if (result) {
            return await matchmakingModel.findOneAndUpdate(
                { "_id": id },
            { $set:{
                "carriedOut": matchMaking.carriedOut,
                "matchMaker": matchMaking.matchMaker,
                "date": matchMaking.date,
            }
        },
            { new: true }         
            );
        }
        else
            return null;
    }
    async deleteMatchmaking(id){
        let result = await matchmakingModel.findOne({ "_id": id });
        if(result){
            return await matchmakingModel.findOneAndDelete({ "_id": id });
         }
         else
             return null;
    }
}
let matchMakingRepository = new MatchmakingRepository();
module.exports = matchMakingRepository;