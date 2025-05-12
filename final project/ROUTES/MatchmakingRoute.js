const express=require("express");
const matchmakingService=require("../BL/SERVICES/MatchmakingService");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        res.status(200).send(await matchmakingService.get());
    }
    catch{
        res.status(400).send("There is no details");
    }
});

router.get('/:matchMaker',async(req,res)=>{
    try{
        res.status(200).send(await matchmakingService.getByMatchMaker(req.params.matchMaker));
    }
    catch{
        res.status(400).send("There is no details");
    }
});

router.post('/',async(req,res)=>{
    try{
        res.status(200).send(await matchmakingService.add(req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        res.status(200).send(await matchmakingService.update(req.params.id,req.body));
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        res.status(200).send(await matchmakingService.delete(req.params.id));
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports=router;