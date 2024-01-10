import mongoose from "mongoose";

export const ConnectDb =async()=>{
    try {
       await mongoose.connect('mongodb://localhost:27017/codeverse')
        console.log(`Database Connected Successfully`)
    } catch (error) {
        console.log(error)
    }
}


