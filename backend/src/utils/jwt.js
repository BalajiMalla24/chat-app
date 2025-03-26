import { User } from "../models/user.model.js"
const generatejwttoken = async (userId , res) =>{
    const user = await User.findById(userId)
    const token = user.generatejwt()
    
    // user.jwtToken = token

  
    return {token}

}

export {generatejwttoken}