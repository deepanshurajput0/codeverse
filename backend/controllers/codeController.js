import mongoose from "mongoose";
import { codeModel } from "../models/codeModel.js";

export const createCode = async(req,res)=>{
    const code = req.body
    const newCode = new codeModel({
        ...code,
        creator:req.userId,
        createdAt: new Date().toISOString()
    })
    try {
        await newCode.save()
       return res.status(201).json(
      {
        message:'Post uploaded successfully',
        newCode
      })
    } catch (error) {
       return res.status(400).json({
            message:"Something went wrong"
        })
    }
}


export const getCodes = async(req,res)=>{
  const {page} = req.query;
    try {
        // const codes = await codeModel.find({})
        // res.status(200).json(codes)
        const limit = 6
        const startIndex = (Number(page) - 1) * limit
        const total = await codeModel.countDocuments()
        const codes = await codeModel.find().limit(limit).skip(startIndex)
        res.status(200).json({
          data:codes,
          currentPage:Number(page),
          totalCodes:total,
          numberOfPages:Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500).send({
            message:'Internal Server Error',
            error
        })
    }
}


export const getSingleCode =async(req,res)=>{
  try {
    const { id } = req.params
    const singleCode = await codeModel.findOne({_id:id})
    res.status(200).send(singleCode)
  } catch (error) {
    res.status(500).send({
        message:'Internal Server Error',
        error
    })
  }
}

export const getCodesByUser =async(req,res)=>{
    try {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
          message:"User doesn't exists"
        })
    }     
    const userCodes = await codeModel.find({creator:id})
    res.status(200).json(userCodes)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message:'Internal Server Error'
      })
    }
}



export const deleteCode =async(req,res)=>{
    try {
      const { id } = req.params
      const codeuser = await codeModel.deleteOne({_id:id})
      if(codeuser){
        return res.status(200).send({
          message:'code deleted successfully'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message:'Internal Server Error'
      })
    }
}


export const updateUserCode=async(req,res)=>{
   try {
    const { id } = req.params
    const { title, description, tags, imageFile,  } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
          message:`No Code exists with this id ${id}`
        })
    }
    const updatedCode ={
      title,
      description,
      tags,
      imageFile
    }
    const newUpdatedCode  = await codeModel.findByIdAndUpdate({_id:id}, updatedCode, {new:true})
     res.status(200).json(newUpdatedCode)
   } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Internal Server Error'
    })
   }
}

export const getCodeBySearch =async(req,res)=>{
   try {
     const { searchQuery } = req.query;
     const title = new RegExp(searchQuery,'i')
     const codes = await codeModel.find({title}).lean()
    //  console.log(codes)
     res.status(200).json(codes)
   } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Internal Server Error'
    })

   }
}

export const getCodeByTags =async(req,res)=>{
  try {
    const { tag } = req.params;
    const codes = await codeModel.find({tags:{$in:tag}})
    res.status(200).json(codes)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Internal Server Error'
    })
  }
}

export const getRelatedCodesByTag =async(req,res)=>{
  try {
    const { tags } = req.body;
    const codes = await codeModel.find({tags:{$in:tags}})
    // console.log(codes)
    res.status(200).json(codes)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Internal Server Error'
    })
  }
}

export const likeCount =async(req,res)=>{
   try {
    const { id } = req.params;
    if(!req.userId){
      return res.json({message:"User is not authenticated"})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message:`No code exists with this id :${id}`})
    }
    const code = await codeModel.findById(id)
    // console.log(code)
    const index = code.likes.findIndex((id)=> id === String(req.userId))
    if(index === -1){
      code.likes.push(req.userId)
    }else{
      code.likes = code.likes.filter((id)=> id !== req.userId)
    }
    const updatedCode = await codeModel.findByIdAndUpdate(id,code,{new:true})
    res.status(200).json(updatedCode)
   } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Internal Server Error'
    })
   }
}