import express from 'express'
import connectDB from './database/dbConnection.js'
import pollsRoute from './Routes/pollRoutes.js'
import cors from 'cors'

const app = express()

connectDB()
app.use(cors({ origin: '*' }));
// Example: Serving frontend from Express
app.use(express.static('client/build'));
app.use(express.json());


app.use('/',pollsRoute)

app.listen(8000,()=>{
    console.log(`Application is running at 8000`)
})