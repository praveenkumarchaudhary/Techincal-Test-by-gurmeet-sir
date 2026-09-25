import express from "express"
import ControllerProfile from "../controller/profile.controller.js"
const router = express.Router

router.post("/",ControllerProfile.CreateProfile)
router.get("/:id",ControllerProfile.GetProfile)
router.put("/:id",ControllerProfile.UpdateProfile)

export default router