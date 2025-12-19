import express from 'express'
import pollDatas from '../database/pollDatas_schema.js'
const pollDatasRoute = express.Router()

pollDatasRoute.get('/',async(req,res)=>{
    try {
        const data = await pollDatas.find({})
        if(!data){
            res.status(400).send({message: "NO pollDatas data"})
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

pollDatasRoute.post('/',async(req,res)=>{
    try {
        const {title,option1,option2,option3,option4} = req.body;
        let data ={}
        if(validate(title) && validate(option1) && validate(option2) && validate(option3) && validate(option4)){
            data={
                pollDatasTitle:title,
                option1name :option1,
                option2name :option2,
                option3name :option3,
                option4name :option4,
            }
        }

        await pollDatas.create(data)
        req.status(200).send({message:"pollDatas Created Successful "})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

pollDatasRoute.patch('/pollDatas/:id',async(req,res)=>{
    try {
        const {option} = req.body;
        let dict = {
            "option1name":1,
            "option2name":2,
            "option3name":3,
            "option4name":4,
        }

        const pollData = await pollDatas.findById(req.params.id)
        if(!pollData){
            res.status(400).send({message:"NO pollData Found"})
        }

        const voteField = `option${dict[option]}vote`;
        pollData[voteField]+=1;

        const totalVotes = pollData.option1votes + pollData.option2votes + 
                           pollData.option3votes + pollData.option4votes;

        pollData.option1percentage = Math.round((pollData.option1votes / totalVotes) * 100);
        pollData.option2percentage = Math.round((pollData.option2votes / totalVotes) * 100);
        pollData.option3percentage = Math.round((pollData.option3votes / totalVotes) * 100);
        pollData.option4percentage = Math.round((pollData.option4votes / totalVotes) * 100);

        await pollData.save();
        res.status(200).send(pollData)
        
    } catch (error) {
     res.status(400).send({error:error})   
    }
})

export default pollDatasRoute;