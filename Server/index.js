import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './MongoDB/Connect.js'
import PostRoutes from './Routes/PostRoutes.js'
import DalleRoutes from './Routes/DalleRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb'}) )

app.use('/api/v1/post', PostRoutes) /*Endpoints*/
app.use('/api/v1/dalle', DalleRoutes) /*Endpoints*/

// app.get('/', async (req, res) => {
//     res.send("Hello From DALL-E");
// })

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(4000, () => console.log('Server has started on port http://localhost:4000'))
    } 
    
    catch (error) {
        console.log(error)
    }
}

startServer()