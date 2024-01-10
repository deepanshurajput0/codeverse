import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
  <Provider store={store} >
 <GoogleOAuthProvider clientId='697074997410-3aj9midve0eooj9c0186es2matm8mn90.apps.googleusercontent.com' >
      <App />
    <Toaster/>
 </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
  </>,
)


