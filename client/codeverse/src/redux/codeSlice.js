import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl2 } from "../api"
import toast from "react-hot-toast"


export const createCode = createAsyncThunk('createCode',async(code,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${baseUrl2}/createcode`,code)
        toast.success(response.data.message)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getCode = createAsyncThunk('getCode',async(page,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${baseUrl2}/getcode?page=${page}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getSingleCode = createAsyncThunk('getSingleCode',async(id,{rejectWithValue})=>{
   try {
    const response = await axios.get(`${baseUrl2}/code/${id}`)
    return response.data
   } catch (error) {
     return rejectWithValue(error.response.data)
   }
})

export const getUserCodes = createAsyncThunk('getusersCode',async(id,{rejectWithValue})=>{
  try {
   const resposne = await axios.get(`${baseUrl2}/userCodes/${id}`)
   return resposne.data    
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteUserCode = createAsyncThunk('deleteUserCode',async(id,{rejectWithValue})=>{
   try {
    const response = await axios.delete(`${baseUrl2}/deletecode/${id}`)
    toast.success('Code Deleted Successfully')
    return response.data
   } catch (error) {
     return rejectWithValue(error.response.data)
   }
})
export const updateUserCode = createAsyncThunk('updateUserCode',async({updatedCode,id},{rejectWithValue})=>{
   try {
    const response = await axios.put(`${baseUrl2}/editcode/${id}`,updatedCode)
    toast.success('Code Updated Successfully')
    return response.data
   } catch (error) {
     return rejectWithValue(error.response.data)
   }
})

export const getCodeBySearch = createAsyncThunk('getCodeBySearch',async(searchQuery,{rejectWithValue})=>{
     try {
      const response = await axios.get(`${baseUrl2}/search?searchQuery=${searchQuery}`)
      return response.data
     } catch (error) {
       return rejectWithValue(error.response.data)
     }
})

export const getCodeByTags = createAsyncThunk('getCodeByTag',async(tag,{rejectWithValue})=>{
   try {
    const response = await axios.get(`${baseUrl2}/tags/${tag}`)
    return response.data
   } catch (error) {
    return rejectWithValue(error.response.data)
   }
})

export const getRelatedCodesByTags = createAsyncThunk('getRelatedCodes',async(tags,{rejectWithValue})=>{
  try {
    const resposne = await axios.post(`${baseUrl2}/relatedcodes`,{tags})
    return resposne.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const likeCodes = createAsyncThunk('likeCodes',async({_id},{rejectWithValue})=>{
  try {
    const resposne = await axios.patch(`${baseUrl2}/like/${_id}`)
    return resposne.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const codeSlice = createSlice({
    name: "code",
    initialState: {
        codes: [],
        userCodes:[],
        tagCodes:[],
        currentPage:1,
        numberOfPages:null,
        relatedCodes:[],
        loading: false,
        error: null
    },
     reducers:{
       setCurrentPage:(state,action)=>{
         state.currentPage = action.payload
       }
     },
    extraReducers: (builder) => {
        builder
            .addCase(createCode.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createCode.fulfilled, (state, action) => {
                state.loading = false;
                state.codes = [action.payload]; // Wrap payload in array
            })
            .addCase(createCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCode.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCode.fulfilled, (state, action) => {
                state.loading = false;
                state.codes = action.payload.data;
                state.numberOfPages = action.payload.numberOfPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getCode.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleCode.pending,(state,action)=>{
               state.loading = true
            })
            .addCase(getSingleCode.fulfilled,(state,action)=>{
              state.loading = false;
              state.codes = action.payload
            })
            .addCase(getSingleCode.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.payload
            })
            .addCase(getUserCodes.pending,(state,action)=>{
               state.loading = true
            })
            .addCase(getUserCodes.fulfilled,(state,action)=>{
              state.loading = false;
              state.userCodes = action.payload
            })
            .addCase(getUserCodes.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.payload
            })
            .addCase(deleteUserCode.pending,(state,action)=>{
             state.loading = true
            })
            .addCase(deleteUserCode.fulfilled,(state,action)=>{
              state.loading = false,
              state.userCodes = state.userCodes.filter((item,i)=>item._id !== action.payload._id)
              state.codes = state.codes.filter((item,i)=>item._id !== action.payload._id)
            })
            .addCase(deleteUserCode.rejected,(state,action)=> { 
            state.loading = false,
            state.error = action.payload
            })
            .addCase(updateUserCode.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(updateUserCode.fulfilled, (state, action) => {
              state.loading = false;
              const {
                  arg: { id },
              } = action.meta;
              if (id) {
                  state.userCodes = state.userCodes.map((item) =>
                      item._id === id ? action.payload : item
                  );
                  state.codes = state.codes.map((item) =>
                      item._id === id ? action.payload : item
                  );
              }
          })
            .addCase(updateUserCode.rejected,(state,action)=>{
              state.loading = false,
              state.error = action.payload
            })
            .addCase(likeCodes.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(likeCodes.fulfilled, (state, action) => {
              state.loading = false
              console.log(action.payload)
              const {
                  arg: { _id },
              } = action.meta;
              if (_id) {
                  state.codes = state.codes.map((item) =>
                      item._id === _id ? action.payload : item
                  );
              }
          })
            .addCase(likeCodes.rejected,(state,action)=>{
              state.error = action.payload
            })
            .addCase(getCodeBySearch.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(getCodeBySearch.fulfilled,(state,action)=>{
               state.loading = false;
               state.codes = action.payload
            })
            .addCase(getCodeBySearch.rejected,(state,action)=>{
              state.loading = false,
              state.error = action.payload  
            })
            .addCase(getCodeByTags.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(getCodeByTags.fulfilled,(state,action)=>{
               state.loading = false;
               state.tagCodes = action.payload
              //  console.log(action.payload)
            })
            .addCase(getCodeByTags.rejected,(state,action)=>{
              state.loading = false,
              state.error = action.payload  
            })
            .addCase(getRelatedCodesByTags.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(getRelatedCodesByTags.fulfilled,(state,action)=>{
               state.loading = false;
               state.relatedCodes = action.payload
              //  console.log(action.payload)
            })
            .addCase(getRelatedCodesByTags.rejected,(state,action)=>{
              state.loading = false,
              state.error = action.payload  
            })
            
    }
});

export const { setCurrentPage } = codeSlice.actions

export default codeSlice.reducer