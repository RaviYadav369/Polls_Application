import express from 'express'
import Poll from '../database/polls_schema.js'
const PoolsRoute = express.Router()


PoolsRoute.get('/analytic/:id',async(req,res)=>{
    try {
        let data ={}
        if(req.params.id){
            
             data = await Poll.findById(req.params.id)
        }
        else{
            const newValue = await Poll.find({})
            data = newValue[0]
        }

        if(!data){
            res.status(400).send({message: "NO Pools data"})
        }
        res.status(200).send(data)
        
    } catch (error) {
        console.log(error)
        res.status(400).send({error:error})
    }
})

function validate(validString){
    if (validString && validString.toString().trim().length > 0) {
        return true;
    }
    return false;
}

PoolsRoute.post('/',async(req,res)=>{
    try {
        const {pollsTitle,option1name,option2name,option3name,option4name} = req.body
        let data ={}
        if(validate(pollsTitle) && validate(option1name) && validate(option2name) && validate(option3name) && validate(option4name)){
            data={
                pollsTitle,
                option1name ,
                option2name ,
                option3name ,
                option4name ,
            }
        }

       const poll =  await Poll.create(data)
        res.status(200).send({message:"Pools Created Successful "})
    } catch (error) {
        console.log(error)
        res.status(400).send({error:error})
    }
})


PoolsRoute.put('/polls/:id',async(req,res)=>{
    try {
        const {option} = req.body;
        let dict = {
            option1name:1,
            option2name:2,
            option3name:3,
            option4name:4,
        }

        const pollData = await Poll.findById(req.params.id)
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

PoolsRoute.get('/',async(req,res)=>{
    try {
        const data = await Poll.find({})
        if(!data){
            res.status(400).send({message: "NO Pools data"})
        }
    
        res.status(200).send(data)
        
    } catch (error) {
        res.status(400).send({error:error})
    }
})


export default PoolsRoute;