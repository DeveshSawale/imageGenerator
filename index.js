import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import imgRoutes from './routes/imgRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit : '45mb'}))

app.use('/api/post', postRoutes)
app.use('/api/img', imgRoutes)


app.get('/', async (req,res) => {
    res.send("Hello World!")
})

const runserver = async () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT || 8080, () => console.log("Server started"))
    } catch (error) {
        console.log(error);   
    }
}

runserver()