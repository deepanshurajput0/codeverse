import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios" 
import { baseUrl } from "../api"
import toast from "react-hot-toast"
const setAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('profile'))?.token;

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
setAuthHeader()   




export const createUser = createAsyncThunk('createUser',async(user,{rejectWithValue})=>{
   try {
    const resposne = await axios.post(`${baseUrl}/signup`,user)
    toast.success(resposne.data.message)
    return resposne.data
   } catch (error) {
    return rejectWithValue(error.response.data)
   }

})

export const loginUser = createAsyncThunk('loginUser',async({user,navigate},{rejectWithValue})=>{
   try {
    const response = await axios.post(`${baseUrl}/signin`,user)
    toast.success(response.data.message)
    navigate('/')
    return response.data
   } catch (error) {
    return rejectWithValue(error.response.data)
   }
})
export const googleLogin = createAsyncThunk('googleLogin',async({result,navigate},{rejectWithValue})=>{
   try {
    const response = await axios.post(`${baseUrl}/googleSignIn`,result)
    toast.success('Google Sign-in Successfully')
    navigate('/')
    return response.data
   } catch (error) {
    return rejectWithValue(error.response.data)
   }
})

const userSlice = createSlice({
  name:'auth',
  initialState:{
   loading:false,
   users:[],
   error:null
  },
   reducers:{
     setUsers:(state,action)=>{
       state.users = action.payload
     },
     logoutUser:(state,action)=>{
      localStorage.clear()
       state.users = null
     }
   },
  extraReducers:(builder)=>{
      builder
      .addCase(createUser.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(createUser.fulfilled,(state,action)=>{
        state.loading = false
        localStorage.setItem('profile',JSON.stringify({...action.payload}))
        state.users = action.payload
      })
      .addCase(createUser.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(loginUser.pending,(state,action)=>{
         state.loading = true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
       state.loading = false
       localStorage.setItem('profile',JSON.stringify({...action.payload}))
       state.users = action.payload
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(googleLogin.pending,(state,action)=>{
         state.loading = true
      })
      .addCase(googleLogin.fulfilled,(state,action)=>{
        state.loading = false
        localStorage.setItem('profile',JSON.stringify({...action.payload}))
        state.users = action.payload
      })
      .addCase(googleLogin.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setUsers, logoutUser } = userSlice.actions

export default userSlice.reducer
