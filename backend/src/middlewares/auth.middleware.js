import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { Apierror } from "../utils/apierror.js";


const userVerify = async (req , res , next) =>{

    try {
        const token = req.cookies?.jwt
    
        if(!token){
            throw new Apierror( 401 , "Unauthorized - no token provided")
        }
    
        const decodedtoken = jwt.verify(token ,  process.env.SECRET_KEY)
    
        if(!decodedtoken){
            throw new Apierror(401 ,"Unauthorized - Invalid request" )
        }
    
        const user = await User.findById(decodedtoken._id)
    
        if(!user){
            throw new Apierror(404 ,  "User not found")
        }
    
        req.user = user
        next()
    } catch (error) {
        // next(new Apierror(500 , error?.message || "Internal server error"))
        console.log("error in protect route middleware" ,error.message)
        throw new Apierror(500 , error?.message || "Internal server error")
    }
}

export {userVerify}