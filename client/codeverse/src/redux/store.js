import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import codeReducer from './codeSlice'
export const store = configureStore({
   reducer:{
      auth:userReducer,
      code:codeReducer
   }
})

