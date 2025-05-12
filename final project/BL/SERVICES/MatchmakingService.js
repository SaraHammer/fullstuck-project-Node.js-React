const valid = require("../VALIDATIONS/MatchmakingValidation");


class MatchmakingService {
    matchmakingRepository = require(".././../DAL/REPOSITORIES/MatchmakingRepository");
    girlRepo = require(".././../DAL/REPOSITORIES/GirlRepository");
    boyRepo = require(".././../DAL/REPOSITORIES/BoyRepository");
    makerRepo = require(".././../DAL/REPOSITORIES/MatchMakerRepository");

    async get() {
        return await this.matchmakingRepository.get();
    }
    async getByMatchMaker(matchMaker) {
        return await this.matchmakingRepository.getByMatchMaker(matchMaker);
    }
    async add(matchmaking) {
        let validNewMatchmaking = valid(matchmaking);
        if (validNewMatchmaking.error) {
            throw new Error("error");
        }
        else {
            const matchs = await this.matchmakingRepository.get();
            let res = matchs.filter(x => x.boyFirstName == matchmaking.boyFirstName && x.boyLastName == matchmaking.boyLastName
                && x.girlFirstName == matchmaking.girlFirstName && x.girlLastName == matchmaking.girlLastName);

            const girls = await this.girlRepo.get();
            let girl = girls.filter(x => x.firstName == matchmaking.girlFirstName && x.lastName == matchmaking.girlLastName);
            if (girl.length < 1)
                throw new Error("this girl is not exist");

            const boys = await this.boyRepo.get();
            let boy = boys.filter(x => x.firstName == matchmaking.boyFirstName && x.lastName == matchmaking.boyLastName);
            if (boy.length < 1)
                throw new Error("this boy is not exist");

            const makers = await this.makerRepo.get();
            let maker = makers.filter(x => x.firstName == matchmaking.matchMaker);
            if (maker.length < 1)
                throw new Error("this match maker is not exist");

            if (res.length > 0)
                throw new Error("this matchmaking already exist");
            else {
                if (matchmaking.carriedOut) {
                    if (girl.length > 0) {
                        await this.girlRepo.deleteGirl(girl[0]._id);
                    }

                    if (boy.length > 0) {
                        await this.boyRepo.deleteBoy(boy[0]._id);
                    }
                }
                return await this.matchmakingRepository.addMatchMaking(matchmaking);
            }
        }
    }
    async update(id, matchmaking) {
        let validNewMatchmaking = valid(matchmaking);
        if (validNewMatchmaking.error) {
            throw new Error("error1");
        }
        else {
            const matchs = await this.matchmakingRepository.get();
            let res = matchs.filter(x => x.boyFirstName == matchmaking.boyFirstName && x.boyLastName == matchmaking.boyLastName
                && x.girlFirstName == matchmaking.girlFirstName && x.girlLastName == matchmaking.girlLastName);

            if (res[0].carriedOut == true && matchmaking.carriedOut == false)
                throw new Error('אין אפשרות לבטל שידוך קיים');

        

            const girls = await this.girlRepo.get();
            let girl = girls.filter(x => x.firstName == matchmaking.girlFirstName && x.lastName == matchmaking.girlLastName);
       

            const boys = await this.boyRepo.get();
            let boy = boys.filter(x => x.firstName == matchmaking.boyFirstName && x.lastName == matchmaking.boyLastName);
  

            const makers = await this.makerRepo.get();
            let maker = makers.filter(x => x.firstName == matchmaking.matchMaker);
            if (maker.length < 1)
                throw new Error("this match maker is not exist");


            else {
                if (matchmaking.carriedOut) {
                    if (girl.length > 0) {
                        await this.girlRepo.deleteGirl(girl[0]._id);
                    }

                    if (boy.length > 0) {
                        await this.boyRepo.deleteBoy(boy[0]._id);
                    }
                }
                return await this.matchmakingRepository.updateMatchMaking(id, matchmaking);
            }
        }

    }
    async delete(id) {
        return await this.matchmakingRepository.deleteMatchmaking(id);
    }
}
let matchmakingService = new MatchmakingService();
module.exports = matchmakingService;