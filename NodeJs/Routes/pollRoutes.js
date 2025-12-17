import express from 'express'
import Polls from '../database/polls_schema.js'
const pollsRoute = express.Router()

pollsRoute.get('/',async(req,res)=>{
    try {
        const data = await Polls.find({})
        if(!data){
            res.status(400).send({message: "NO Polls data"})
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

pollsRoute.post('/',async(req,res)=>{
    try {
        const {title,option1,option2,option3,option4} = req.body;
        let data ={}
        if(validate(title) && validate(option1) && validate(option2) && validate(option3) && validate(option4)){
            data={
                pollsTitle:title,
                option1name :option1,
                option2name :option2,
                option3name :option3,
                option4name :option4,
            }
        }

        await Polls.create(data)
        req.status(200).send({message:"Polls Created Successful "})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

pollsRoute.patch('/polls/:id',async(req,res)=>{
    try {
        const {option} = req.body;

        const pollData = await Polls.findById(req.params.id)
        if(!pollData){
            res.status(400).send({message:"NO poll Found"})
        }
        
        
    } catch (error) {
     res.status(400).send({error:error})   
    }
})

export default pollsRoute;