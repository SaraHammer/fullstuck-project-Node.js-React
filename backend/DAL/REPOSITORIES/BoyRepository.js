const boyModel = require('../MODELS/BoyModel');

class BoyRepository {

    async get(){
        return await boyModel.find();
    }
    async addBoy(boy) {
        const newBoy = new boyModel(boy);
        await newBoy.save();
        return newBoy;
    }
    async updateBoy(id, boy) {
        let result = await boyModel.findOne({ "_id": id });
        if (result) {
            return await boyModel.findOneAndUpdate(
                { "_id": id },
            { $set:{
                "firstName": boy.firstName,
                "lastName": boy.lastName,
                 "age": boy.age,
                 "belonging": boy.belonging,
                 "yeshiva": boy.yeshiva,
            }
        },
            { new: true }         
            );
        }
        else
            return null;
    }
    async deleteBoy(id){
        let result = await boyModel.findOne({ "_id": id });
        if(result){
           return await boyModel.findOneAndDelete({ "_id": id })
        }
        else
            return null;
    }
}
let boyRepository = new BoyRepository();
module.exports = boyRepository;