import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
   senderid:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 receiverid:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 text:{
    type:String
 },
 image:{
    type:String
 }


} , {timestamps:true})

export const message = mongoose.model("message" , messageSchema)