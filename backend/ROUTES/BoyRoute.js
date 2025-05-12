const express=require("express");
const boyService=require("../BL/SERVICES/BoyService");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        res.status(200).send(await boyService.get());
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        res.status(200).send(await boyService.add(req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        res.status(200).send(await boyService.update(req.params.id,req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        res.status(200).send(await boyService.delete(req.params.id));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

module.exports=router;