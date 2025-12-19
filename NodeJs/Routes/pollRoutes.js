import express from 'express'
import Polls from '../database/polls_schema.js'
const PoolsRoute = express.Router()

PoolsRoute.get('/',async(req,res)=>{
    try {
        const data = await Polls.find({})
        if(!data){
            res.status(400).send({message: "NO Pools data"})
        }
    
        res.status(200).send(data)
        
    } catch (error) {
        res.status(400).send({error:error})
    }
})

function validate(validString){
    if(validString.length >0 ||  !isNaN(validString)){
        return true
    }

    return false
}

PoolsRoute.post('/',async(req,res)=>{
    try {
        console.log('post')
        const {title,option1,option2,option3,option4} = req.body;
        let data ={}
        console.log(title,option1,option2,option3,option4)
        if(validate(title) && validate(option1) && validate(option2) && validate(option3) && validate(option4)){
            data={
                PoolsTitle:title,
                option1name :option1,
                option2name :option2,
                option3name :option3,
                option4name :option4,
            }
        }

       const poll =  await Polls.create(data)
        req.status(200).send({message:"Pools Created Successful "})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

PoolsRoute.patch('/Pools/:id',async(req,res)=>{
    try {
        const {option} = req.body;
        let dict = {
            "option1name":1,
            "option2name":2,
            "option3name":3,
            "option4name":4,
        }

        const pollData = await Polls.findById(req.params.id)
        if(!pollData){
            res.status(400).send({message:"NO pollData Found"})
        }

        const voteField = `option${dict[option]}vote`;
        pollData[voteField]+=1;

        const totalVotes = pollData.option1vote + pollData.option2vote + 
                           pollData.option3vote + pollData.option4vote;

        pollData.option1percentage = Math.round((pollData.option1vote / totalVotes) * 100);
        pollData.option2percentage = Math.round((pollData.option2vote / totalVotes) * 100);
        pollData.option3percentage = Math.round((pollData.option3vote / totalVotes) * 100);
        pollData.option4percentage = Math.round((pollData.option4vote / totalVotes) * 100);

        await pollData.save();
        res.status(200).send(pollData)
        
    } catch (error) {
     res.status(400).send({error:error})   
    }
})

export default PoolsRoute;