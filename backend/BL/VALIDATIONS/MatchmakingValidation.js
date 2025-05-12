const joi=require('joi');

const validMatchmaking=(_bodyData)=>{
    let matchmakingScema=joi.object({
        boyFirstName:joi.string().required(),
        boyLastName:joi.string().required(),
        girlFirstName:joi.string().required(),
        girlLastName:joi.string().required(),
        carriedOut:joi.boolean().required(),
        matchMaker:joi.string().required(),
        date:joi.string().required()
    });
    return matchmakingScema.validate(_bodyData);
}
module.exports=validMatchmaking;