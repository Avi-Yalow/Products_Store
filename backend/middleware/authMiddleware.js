import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req,res,next)=>{
    let token;
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            request.user = await User.findById(decoded.userId).select("-password")
            next()
        } catch (error) {
            console.log("Not authorized, invalid token")
            res.status(401).json({success:false, message :"Not authorized, invalid token"})
        
        }

    }else{
        console.log("Not authorized, no token")
        res.status(401).json({success:false, message :"Not authorized, no token"})
    }
}

export {protect}