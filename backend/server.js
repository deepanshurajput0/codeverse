import express from "express"
import { config } from "dotenv"
import { ConnectDb } from "./config/db.js"
import userRoute from "./routes/userRoute.js"
import codeRoute from './routes/codeRoute.js'
import cors from "cors"
config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/v1',userRoute)
app.use('/codes',codeRoute)
ConnectDb() 
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port ${process.env.PORT}`)
})


