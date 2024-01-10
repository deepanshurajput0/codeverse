import mongoose from "mongoose"

const codeSchema = new mongoose.Schema({
    title:String,
    description:String,
    name:String,
    creator:String,
    tags:[String],
    imageFile:String,
    createdAt:{
        type:Date,
        default: new Date()
    },
    likes:{
        type:[String],
        default:[]
    }
})

export const codeModel = new mongoose.model('codes',codeSchema)

