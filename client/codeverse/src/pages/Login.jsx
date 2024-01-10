import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { loginUser, googleLogin } from '../redux/userSlice'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast'
import loginImg from '../../public/images/login.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const error = useSelector((state)=>state.auth.error)
  useEffect(()=>{
    error &&  toast.error(error.message)
  },[error])
const [user, setUser] =useState({
  email:"",
  password:""
})
const InputValue =(e)=>{
   setUser({
    ...user, [e.target.name]:e.target.value
   })
}
  function handleLogin(e){
     e.preventDefault()
     dispatch(loginUser({user,navigate}))
  }
  return (
    <div className='login'>

        <div className='login-sec'>
        <div className="login-img">
     <img  src={loginImg} alt="" />
     </div>
        <form onSubmit={handleLogin} >
        <h1>Login Now</h1>
        <p>Dont' have an account ?<span style={{cursor:"pointer"}}  >
          <Link to={'/signup'} style={{color:"orange", textDecoration:"none"}} >register</Link></span></p>
    <input type="email"
     placeholder='Enter Your Email'
     value={user.email}
     name='email'
     onChange={InputValue}
      /> <br />
      <input type="password" 
      placeholder='Enter Your Password'
      value={user.password}
      name='password'
      onChange={InputValue}
       /> <br />
      <button style={{marginBottom:'20px'}}  type='submit' >Submit</button>
      <span style={{width:"21rem"}} >
 <GoogleLogin
  onSuccess={credentialResponse => {
    const { credential:token} = credentialResponse
    const {name, email, } = jwtDecode(credentialResponse.credential)
    const { sub } = jwtDecode(credentialResponse.credential)
    const googleId = sub
    const result = {name,email,token,googleId}
    // console.log(result)
    // console.log(result)
     dispatch(googleLogin({result, navigate}))
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
 </span>
    </form>
   
        </div>

    </div>
  )
}

export default Login


