const valid = require("../VALIDATIONS/BoyValidation")

class BoyService {
    boyRepository = require(".././../DAL/REPOSITORIES/BoyRepository");
    async get() {
        return await this.boyRepository.get();
    }
    async add(boy) {
        let validNewBoy = valid(boy);
        if (validNewBoy.error) {
            throw new Error("error");
        }
        else {
            const num = parseFloat(boy.age);
            if (!isNaN(num) && num >= 18 && num <= 30) {
                if (boy.belonging === "חסידים" || boy.belonging === "ליטאים" || boy.belonging === "ספרדים") {
                    const boys = await this.boyRepository.get();
                    let res = boys.filter(x=>x.firstName== boy.firstName  && x.lastName==boy.lastName);
                    if (res.length>0)
                        throw new Error("this boy already exist");
                    else
                        return await this.boyRepository.addBoy(boy);
                }
                else
                    throw new Error("belonging error");
            }
            else
                throw new Error("age error");
        }
    }
    async update(id, boy) {
        let validNewBoy = valid(boy);
        if (validNewBoy.error) {
            throw new Error("error");
        }
        else {
            const num = parseFloat(boy.age);
            if (!isNaN(num) && num >= 18 && num <= 30) {
                if (boy.belonging === "חסידים" || boy.belonging === "ליטאים" || boy.belonging === "ספרדים")
                    return await this.boyRepository.updateBoy(id, boy);
                else
                    throw new Error("belonging error");
            }
            else
                throw new Error("age error");
        }

    }
    async delete(id) {
        return await this.boyRepository.deleteBoy(id);
    }
}
let boyService = new BoyService();
module.exports = boyService;