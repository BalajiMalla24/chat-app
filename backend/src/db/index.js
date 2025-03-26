import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
const connectdb = async () =>{
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("connected to db successfully")
        console.log(response.connection.host)

    } catch (error) {
        console.log("Error connecting to db" , error)
        process.exit(1)
    }
}

export {connectdb}