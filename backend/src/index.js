import express from 'express'
import { authrouter } from './routes/auth.route.js'
import dotenv from "dotenv"
import { connectdb } from './db/index.js'
import cookieparser from 'cookie-parser'
import { messagerouter } from './routes/message.route.js'
import cors from 'cors'
import { app, server } from './utils/socket.js'
dotenv.config({
    path: "./.env"
})
// const app = express()

const port = process.env.PORT

app.use(cookieparser());

app.use(express.json({ limit: "10mb" }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
connectdb().then(
    server.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
)




app.use("/api/v1/users", authrouter)
app.use("/api/v1/messages", messagerouter)
