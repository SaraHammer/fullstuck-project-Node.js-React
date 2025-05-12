const joi=require('joi');

const validGirl=(_bodyData)=>{
    let girlScema=joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        age:joi.string().required(),
        belonging:joi.string().required(),
        specialisation:joi.string().required(),
    });
    return girlScema.validate(_bodyData);
}
module.exports=validGirl;