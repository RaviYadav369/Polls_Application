import mongoose from 'mongoose'

const PollsSchema = new mongoose.Schema({
    pollsTitle:String,
    option1name :String,
    option2name :String,
    option3name :String,
    option4name :String,
    option1percentage:Number,
    option2percentage:Number,
    option3percentage:Number,
    option4percentage:Number,
})

const Polls = mongoose.model('Polls',PollsSchema);

export default Polls;