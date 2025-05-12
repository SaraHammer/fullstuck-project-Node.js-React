const girlModel = require('../MODELS/GirlModel');

class GirlRepository {
    async get() {
        return await girlModel.find();
    }
    
    async addGirl(girl) {
        const newGirl = new girlModel(girl);
        await newGirl.save();
        return newGirl;
    }

    async updateGirl(id, girl) {
        let result = await girlModel.findOne({ "_id": id });
        if (result) {
            return await girlModel.findOneAndUpdate(
                { "_id": id },
                {
                    $set: {
                        "firstName": girl.firstName,
                        "lastName": girl.lastName,
                        "age": girl.age,
                        "belonging": girl.belonging,
                        "specialisation": girl.specialisation,
                    }
                },
                { new: true }
            );
        }
        else
            return null;
    }
    async deleteGirl(id) {
        let result = await girlModel.findOne({ "_id": id });
         if(result){
           return await girlModel.findOneAndDelete({ "_id": id })
        }
        else
            return null;
    }
}
let girlRepository = new GirlRepository();
module.exports = girlRepository;