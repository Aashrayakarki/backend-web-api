const express = require('express');
const connectDatabase = require('./database/database.js')
const dotenv = require('dotenv');
const cors = require('cors')


const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.use(express.json())

dotenv.config()

connectDatabase()

const PORT = process.env.PORT;

app.get('/test', (req, res) => {

    res.send('Hello World!')

})

app.use('/api/user', require('./routes/userRoutes.js'))

app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
})