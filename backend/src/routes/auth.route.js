import { Router } from "express";
import { signup ,login , logout ,  updateProfile , checkauth} from "../controllers/auth.controller.js";
import { userVerify } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middeware.js";
const authrouter = Router()

// authrouter.get('/signup' , (req , res)=>{
//     res.send("signup route")
// })
// authrouter.get('/login' , (req , res)=>{
//     res.send("login route")
// })
// authrouter.get('/logout' , (req , res)=>{
//     res.send("logout route")
// })
authrouter.route('/signup').post(signup)
authrouter.route('/login').post(login)
authrouter.route('/logout').post(logout)
authrouter.route('/update-profile').patch(userVerify , updateProfile)
authrouter.route('/check').get(userVerify , checkauth )

export {authrouter}