import { userModel } from "../models/userModel.js"
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).send({
                success: false,
                message: 'All Fields are required'
            });
        }
      if(name.length<4 || name.length>30){
         return res.status(400).send({
            success:false,
            message:'Name should be between 4 and 30 characters'
         })
      }
      if(password.length<8){
         return res.status(400).send({
            success:false,
            message:'Password should be at least 8 characters long'
         })
      }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send({
                success: false,
                message: 'Email Already Exists Try New'
            });
        }
        const ourUser = await userModel.create({
            name,
            email,
            password
        });
     
       const token = ourUser.getJWTToken()
       
        return res.status(200).send({
            success: true,
            message: 'User created successfully',
            ourUser,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while creating user',
            error
        });
    }
};


export const signinController =async(req,res)=>{
  try {
    const { email, password } = req.body
    if(!email || !password){
       return res.status(400).send({
        success:false,
        message:'All Fields are required'
       })
    }
    const user = await userModel.findOne({email})
    if(!user){
       return res.status(400).send({
        success:false,
        message:'Invalid User'
       })
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return res.status(400).send({
            message:'Incorrect Password please try again'
        })
    }
    const token = user.getJWTToken()
    return res.status(200).send({
        message:'User Logged in Successfully',
        success:true,
        result:user,
        token
    })
  } catch (error) {
    return res.status(500).send({
        message:'Internal Server Error',
        error
    })
  }
}


export const googleSignin=async(req,res)=>{
       
    try {
        const { name, email, token, googleId } = req.body
        const olduser = await userModel.findOne({email})
    if(olduser){
        const result = {_id:olduser._id.toString(),email,name,googleId}
        return res.status(200).json({result,token})
    }
    const result = await userModel.create({
        name,
        email,
        googleId
    })
    return res.status(200).send({
        result, token
    })
    } catch (error) {
        return res.status(500).send({
            message:'Something went wrong',
            error
        })
    }
}


