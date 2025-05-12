const express=require("express");
const matchMakerService=require("../BL/SERVICES/MatchMakerService");
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        res.status(200).send(await matchMakerService.get());
    }
    catch{
        res.status(400).send("There is no details");
    }
});

router.post('/',async(req,res)=>{
    try{
        res.status(200).send(await matchMakerService.add(req.body));
    }
    catch{
        res.status(400).send();
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        res.status(200).send(await matchMakerService.delete(req.params.id));
    }
    catch{
        res.status(400).send();
    }
});

module.exports=router;