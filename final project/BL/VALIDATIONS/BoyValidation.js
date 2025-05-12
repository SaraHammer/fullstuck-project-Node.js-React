const joi=require('joi');

const validBoy=(_bodyData)=>{
    let boyScema=joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        age:joi.string().required(),
        belonging:joi.string().required(),
        yeshiva:joi.string().required(),
    });
    return boyScema.validate(_bodyData);
}
module.exports=validBoy;