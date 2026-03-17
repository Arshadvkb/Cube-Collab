import bcrypt from "bcrypt"
import userModel from "../models/user.model.js"
import { genrateToken } from "../utils/tokens.js"
import cloudinary from "../config/cloudinary.js";

const signup=async(req,res)=>{
    console.log( req.body);
    console.log(req.file);
    
     const {name,email,password}=req.body
   
    
     

     if(!name || !email || !password){
        return res.status(404).json({success:false,msg:"all fields are rquired"})
     }
    try {

        const existingUser= await userModel.findOne({email})

        if(existingUser){
            return res.status(400).json({msg:"user with this email already exists",success:false})
        }
        
         const uploadResult = await cloudinary.uploader.upload(req.file.path, {
           resource_type: "auto",
           folder: "cube_collab",
         });
         const imageUrl=uploadResult.secure_url
        
         const salt=await bcrypt.genSalt(10)
         const hashedPassword=await bcrypt.hash(password,salt)

         const newUser=new userModel({
            name,
            email,
            password:hashedPassword,
            avatar:imageUrl
         })

         await newUser.save()
         await genrateToken(newUser._id,res)
         
         return res.status(200).json({success:true,msg:"Registerd successfuly"})



    } catch (error) {
        console.log("error in signup :" +error.message);
        return res.status(500).json({success:false,msg:"error in signup",error:error.message})
     }
}


export default signup