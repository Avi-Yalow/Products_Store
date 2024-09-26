import User from "../models/user.js";
import generateToken from  "../utils/generateToken.js"


export const auth = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.find({email})
        if (user && await user.matchPassword(password)){
            generateToken(res, user._id)
            return res.status(201).json({success:true,data:{"id":user._id,"name":user.name,"email":user.email}})
        }
        else{
            return res.status(401).json({success:false,message:"invalid email or password"})
        }
    }
    catch(error){
        console.log("Error in create user ",error.message)
        res.status(500).json({success:false, message:"Server Error"})
    
    }

    
}

export const register = async (req,res)=>{
    const {name,email,password} = req.body
    const userExists = await User.find({email})
    if (userExists){ 
        return res.status(400).json({success:false,message:"user allready exists"})
    }
try{
    const user= await User.create({
        name,
        email,
        password
    })
    if (user){
        generateToken(res, user._id)
        return res.status(201).json({success:true,data:{"id":user._id,"name":user.name,"email":user.email}})
    }
    else{
        return res.status(400).json({success:false,message:"invalid user data"})
    }
}
catch(error){
    console.log("Error in create user ",error.message)
    res.status(500).json({success:false, message:"Server Error"})
}

 }

export const logout = async (req,res)=>{
    res.cookie('jwt','' ,{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({success:true,message:"User logout"})
}

export const getUserProfile = async (req,res)=>{
    const user = {
        id: req._id,
        name: req.name,
        email: req.email
    }
    return res.status(200).json({success:true,data: user})
}

export const updateUserProfile = async (req,res)=>{
    const user = await User.findById(req.user._id)
    
    if(user){
        user.name = req.body.name ||user.name
        user.email = req.body.email ||user.email
        if(req.body.password) {
            user.email = req.body.password
        }
        const updatedUser = await user.save()
        return res.status(200).json({success:true,data: updatedUser})

    } else {
        return res.status(400).json({success:false,message:"user not found"})
    }
    
    return res.status(201).json({success:true,message:"update User Profile"})
}