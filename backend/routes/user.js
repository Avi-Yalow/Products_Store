import express from 'express'
//import mongoose from 'mongoose'
//import User from '../models/user.js'
import {auth,register,logout,getUserProfile,updateUserProfile} from '../controller/user.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
router.post("/", register)
router.post("/auth", auth)
router.post("/logout", logout)
router.get("/profile",protect, getUserProfile)
router.put("/profile", protect,updateUserProfile)

export default router