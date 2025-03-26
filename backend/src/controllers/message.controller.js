import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { User } from "../models/user.model.js";
import { message } from "../models/message.model.js";
import cloudinary from "../utils/Cloudinary.js";

const getUsersforSidebar = asynchandler(async (req , res)=>{
    //req.user from userVerify

    const LoggedInUser = req.user._id
    if(!LoggedInUser){
        throw new Apierror(401 , "User is not logged in")
    }
    const sidebarUsers = await User.find({_id:{$ne:LoggedInUser}})

    if(!sidebarUsers){
        throw new Apierror(404 , "there are no users in your contact list")
    }

    return res.status(200).json(
        new apiresponse(200  ,sidebarUsers , "Users fetched sucessfully" )
    )
})

const getMessages = asynchandler(async(req , res)=>{
     const myId = req.user._id
     const {id:usertoChatId} = req.params

     const messages = await message.find({
        $or:[{senderid:myId , receiverid:usertoChatId},
            {senderid:usertoChatId , receiverid:myId}
        ]
  } )

  res.status(200).json(
    new apiresponse(200 , messages , "messages fetched successfully")
  )
})

const sendMessages = asynchandler(async(req ,res)=>{
    const {image , text} =req.body

    const senderId = req.user._id
    const {id:receiverid} = req.params

    let imageUrl
    if(image){
      const uploadimage =  await cloudinary.uploader.upload(image)
      imageUrl = uploadimage.secure_url
    }

    const newMessage = await message.create({
        senderid:senderId,
        receiverid,
        image:imageUrl,
        text
    })
    await newMessage.save({validateBeforeSave:false})


    return res.status(201).json(
       new apiresponse(201 , newMessage , "message creation sucessfull")
    )
})

export {getUsersforSidebar , getMessages , sendMessages}