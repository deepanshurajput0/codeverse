import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { createUser } from '../redux/userSlice'
import regImg from '../../public/images/scene.jpg'
import toast from 'react-hot-toast'
import './Register.css'
const Register = () => {
    const dispatch = useDispatch()
    const error = useSelector((state)=>state.auth.error)
  
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const InputValue=(e)=>{
        setUser({
            ...user, [e.target.name]:e.target.value
        }) 
    }
    useEffect(()=>{
      error &&    toast.error(error.message)
    },[error])

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createUser(user))
    }
  return (
    <div className='signup' >
     <div className='reg-section'>
     <form onSubmit={handleSubmit} >
     <h1>Create your <br /> account</h1>
     <p>Already have an account ? <span>login now </span></p>
     <input 
        type="text"
        placeholder='Enter Your Name'
        onChange={InputValue}
        value={user.name} 
        name="name" 
        id="" /> <br />
        <input 
        type="email"
        placeholder='Enter Your Email'
        onChange={InputValue}
        value={user.email}
        name='email'
        id="" 
        /> <br />
        <input 
        type="password"
        placeholder='Enter Your Password'
        onChange={InputValue} 
        value={user.password}
        name="password"
         id="" /> <br />
        <button type='submit' >SignUp</button>
     </form>
     <div className='reg-img'>
        <img src={regImg} alt="img" />
     </div>
     </div>
    </div>
  )
}

export default Register


