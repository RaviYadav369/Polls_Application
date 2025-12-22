import mongoose from 'mongoose'

const PollsSchema = new mongoose.Schema({
    pollsTitle:String,
    option1name :String,
    option2name :String,
    option3name :String,
    option4name :String,
    option1vote:{type:Number, default:0},
    option2vote:{type:Number, default:0},
    option3vote:{type:Number, default:0},
    option4vote:{type:Number, default:0},
    option1percentage:{type:Number, default:0},
    option2percentage:{type:Number, default:0},
    option3percentage:{type:Number, default:0},
    option4percentage:{type:Number, default:0},
})

const Poll = mongoose.model('Poll',PollsSchema);

export default Poll;