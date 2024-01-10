import React, { useEffect, useState } from 'react'
import {Link  } from "react-router-dom"
import { FaCode, FaStumbleuponCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css'
import { logoutUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { IoMdSearch } from "react-icons/io";
import { getCodeBySearch } from '../redux/codeSlice';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=>state?.auth?.users?.result)
  // console.log(user)
 const [search, setSearch] = useState('')
 function Logout(){
   dispatch(logoutUser())
   toast.success('Logout Successfully')
 }
 

 function handleSubmiit(e){
     e.preventDefault()
     if(search){
       dispatch(getCodeBySearch(search))
       navigate(`/codes/search?searchQuery=${search}`)
       setSearch("")
     }else{
       navigate('/')
     }
 }
  return (
    <div>
      <div className='navbar'>
          <div className="logo">
              <h2>CodeVerxe</h2>
              <span>
              <FaCode size={25} />
              </span>
          </div>
          <ul>
          <li> <Link to='/' >Home</Link> </li>
          <li className='search' > <form onSubmit={handleSubmiit} >
            <input type="text" 
            placeholder='Search Your Codes....'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            </form> 
            <div className='search-icon' >
              <IoMdSearch size={25} />
            </div>
            </li>
            {
              user?._id && (
               <>
                <li> <Link to={'/addcode'} >Add Codes</Link> </li>
                <li> <Link to='/dashboard' >Dashboard</Link> </li>
               </>
              )
            }
             {
              user?._id ?  <li onClick={Logout} > <Link >Logout</Link> </li> :
               <li> <Link to={'/signin'} >Login</Link> </li>
             }
            {/* <li> <Link></Link> </li> */}

          </ul>
      </div>
    </div>
  )
}

export default Navbar


