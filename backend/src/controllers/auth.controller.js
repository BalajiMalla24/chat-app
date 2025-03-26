import { User } from "../models/user.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { generatejwttoken } from "../utils/jwt.js";
import bcrypt from 'bcrypt'
import cloudinary from "../utils/Cloudinary.js";

const signup = asynchandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
        throw new Apierror(400, "fill up the missing fields")
    }

    if (password.length < 6) {
        throw new Apierror(400, "password should be minimum of 6 characters")
    }
    const user = await User.findOne({ email })

    if (user) {
        throw new Apierror(401, "User already exists")
    }

    const salt = await bcrypt.genSalt(10)

    const hashpassword = await bcrypt.hash(password, salt)

    const newuser = await User.create({
        fullName,
        password: hashpassword,
        email

    })

    if (!newuser) {
        throw new Apierror(500, "Internal Server Error")
    }

    const { token } = await generatejwttoken(newuser._id, res)
    await newuser.save({ validateBeforeSave: false })


    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    }
    const reguser = await User.findById(newuser._id)

    if (!reguser) {
        throw new Apierror(404, "user not found")
    }

    // res.cookie("jwt" , token , options)
    res.status(201)
        .cookie("jwt", token, options)
        .json(
            new apiresponse(201, reguser, "user registration successfull")
        )
})

const login = asynchandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Apierror(400, "please enter both email and passsword")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new Apierror(404, "User not found in the db")
    }

    const checkpassword = await bcrypt.compare(password, user.password)

    if (!checkpassword) {
        throw new Apierror(401, "invalid password entered")
    }

    const { token } = await generatejwttoken(user._id, res)
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    }
    return res.status(200)
        .cookie("jwt", token, options)
        .json(
            new apiresponse(200, "user loggedin successfully")
        )


})

const logout = asynchandler(async (req, res) => {
    const token = req.cookies.jwt

    if (!token) {
        throw new Apierror(401, "unauthorized request")
    }

    const options = {

        maxAge: 0
    }

    return res.status(200)
        .cookie("jwt", "", options)
        .json(
            new apiresponse(200, "user logged out successfully")
        )
})

const updateProfile = asynchandler(async (req, res) => {
    const { coverphoto } = req.body

    if (!coverphoto) {
        throw new Apierror(401, "Profile pic required")
    }
    const userId = req.user._id
    const user = await User.findById(userId).select("-password")
    if (!user) {
        throw new Apierror(404, "user not found in db")
    }

     user.coverphoto=""
     await user.save({validateBeforeSave:false})

    const coverphotoupload = await cloudinary.uploader.upload(coverphoto)

    if (!coverphotoupload) {
        throw new Apierror(500, "error while uploading")
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
        coverphoto: coverphotoupload.secure_url
    }, {
        new: true
    })


    return res.status(201).json(
        new apiresponse(201, updateUser, "User profile updated successfully")
    )
})

const checkauth = asynchandler((req, res) => {
    //req.user from middleware
    const user = req.user
    return res.status(200).json(
        new apiresponse(200, user, "User fetched successfully")
    )
})

export {
    signup, login, logout, updateProfile, checkauth
}
