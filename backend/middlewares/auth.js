import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js"
export const authMiddlware =async(req,res,next)=>{
   const  token  = req.headers.authorization.split(" ")[1]
   if(!token){
      return res.status(401).json({
        message:'token not provided'
      })
   }
   const isCustomAuth = token.length < 500
   let decodedData 
   if(token && isCustomAuth){
        decodedData = jwt.verify(token,process.env.JWT_SECRET, { algorithm: 'HS256' })
        req.userId = decodedData?._id
   }else{
      decodedData = jwt.decode(token)
      const googleId = decodedData?.sub?.toString()
      const user = await userModel.findOne({googleId})
      req.userId = user?._id
   }
    next()
}

