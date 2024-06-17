const express = require('express');
const connectDatabase = require('./database/database.js')
const dotenv = require('dotenv');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const acceptFormData = require('express-fileupload');
const multipart = require('connect-multiparty');

const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200 
}

app.use(cors(corsOptions))

//Use express file upload
app.use(fileUpload())

//Express Json Config
app.use(express.json())

app.use(acceptFormData())

//Make a static public folder
app.use(express.static('./public'))

app.use(multipart());

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

//configuring Routes of Exercise

//Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
})