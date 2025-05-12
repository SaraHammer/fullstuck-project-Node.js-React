const joi=require('joi');

const validMatchMaker=(_bodyData)=>{
    let matchMakerScema=joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
    });
    return matchMakerScema.validate(_bodyData);
}
module.exports=validMatchMaker;