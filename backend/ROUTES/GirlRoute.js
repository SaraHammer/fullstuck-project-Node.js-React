const express=require("express");
const girlService=require("../BL/SERVICES/GirlService");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        res.status(200).send(await girlService.get());
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        res.status(200).send(await girlService.add(req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        res.status(200).send(await girlService.update(req.params.id,req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        res.status(200).send(await girlService.delete(req.params.id));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

module.exports=router;