const valid = require("../VALIDATIONS/MatchMakerValidation")

class MatchMakerService {
    matchMakesRepository = require(".././../DAL/REPOSITORIES/MatchMakerRepository");
    async get() {
        return await this.matchMakesRepository.get();
    }
    async add(matchMaker) {
        console.log("ser post");
        let validNewMaker = valid(matchMaker);
        if (validNewMaker.error) {
            throw new Error("error");
        }
        else {
            const matchMakers = await this.matchMakesRepository.get();
            let res = matchMakers.filter(x => x.firstName == matchMaker.firstName && x.lastName == matchMaker.lastName);
            if (res.length > 0)
                throw new Error("this match maker already exist");
            else
            return await this.matchMakesRepository.addMatchMaker(matchMaker);
        }
    }

    async delete(id) {
        return await this.matchMakesRepository.deleteMatchMaker(id);
    }
}
let matchMakersService = new MatchMakerService();
module.exports = matchMakersService;