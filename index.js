const express = require('express');
const connectDatabase = require('./database/database.js')
const dotenv = require('dotenv');
const cors = require('cors')
const acceptFormData = require('express-fileupload')


const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200 
}

app.use(cors(corsOptions))

//Express Json Config
app.use(express.json())

app.use(acceptFormData())

//dotenv Configuration
dotenv.config()

//Connecting to database
connectDatabase()

//Defining the port
const PORT = process.env.PORT;

//Making a test endpoint
//Endpoints: POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{
    res.send("Test API is Working!...")
})

//configuring Routes of User
app.use('/api/user', require('./routes/userRoutes.js'))

//Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
})