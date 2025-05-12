const valid = require("../VALIDATIONS/GirlValidation")

class GirlService {
    girlRepository = require(".././../DAL/REPOSITORIES/GirlRepository");
    async get() {
        return await this.girlRepository.get();
    }
    async add(girl) {
        let validNewGirl = valid(girl);
        if (validNewGirl.error) {
            throw new Error("error");
        }
        else {
            const num = parseFloat(girl.age);
            if (!isNaN(num) && num >= 18 && num <= 30) {
                if (girl.belonging === "חסידים" || girl.belonging === "ליטאים" || girl.belonging === "ספרדים") {
                    const girls = await this.girlRepository.get();
                    let res = girls.filter(x => x.firstName == girl.firstName && x.lastName == girl.lastName);
                    if (res.length > 0)
                        throw new Error("this girl already exist");
                    else
                        return await this.girlRepository.addGirl(girl);
                }
                else
                    throw new Error("belonging error");
            }
            else
                throw new Error("age error");
        }
    }
    async update(id, girl) {
        let validNewGirl = valid(girl);
        if (validNewGirl.error) {
            throw new Error("error");
        }
        else {
            const num = parseFloat(girl.age);
            if (!isNaN(num) && num >= 18 && num <= 30) {
                if (girl.belonging === "חסידים" || girl.belonging === "ליטאים" || girl.belonging === "ספרדים")
                    return await this.girlRepository.updateGirl(id, girl);
                else
                    throw new Error("belonging error");
            }
            else
                throw new Error("age error");
        }

    }
    async delete(id) {
        return await this.girlRepository.deleteGirl(id);
    }
}
let girlService = new GirlService();
module.exports = girlService;