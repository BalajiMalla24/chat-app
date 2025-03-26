import { Router } from "express";
import { userVerify } from "../middlewares/auth.middleware.js";
import { getUsersforSidebar , getMessages , sendMessages } from "../controllers/message.controller.js";
const messagerouter = Router()

messagerouter.route("/users").get(userVerify , getUsersforSidebar)

messagerouter.route("/:id").get(userVerify , getMessages)

messagerouter.route("/send/:id").post(userVerify , sendMessages)
export {messagerouter}