import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import jwt from "jsonwebtoken"
// import bcrypt from 
const userSchema = new Schema ({
 fullName:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 coverphoto:{
    type:String,
    default:''
 },
 password:{
    type:String,
    required:true,
    minlength:6
 },
//  jwtToken:{
//    type:String
//  }

} , {timestamps:true})

// User.methods.encrypt = userSchema.pre("save" , async (password)=>{

// })
// userSchema.pre("save" , async (next)=>{
//     if(!this.isModified(password)){
//       return next
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password , salt)
// })

// userSchema.methods.isPasswordCorrect = async (password)=>{
//   return await bcrypt.compare(password , this.password)
// }

userSchema.methods.generatejwt = function(){
   return jwt.sign({
      _id :this._id
   },
   process.env.SECRET_KEY,
   {
      expiresIn:process.env.EXPIRES_IN
   }
   
)
}



export const User = mongoose.model("User" , userSchema) 