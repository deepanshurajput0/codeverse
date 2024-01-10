import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { deleteUserCode, getUserCodes } from '../redux/codeSlice'
import { FaUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import './Dashboard.css'
import Loader from '../components/Loader';
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom"
const Dashboards = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state)=>state?.auth?.users?.result?._id)
    const  name  = useSelector((state)=>state?.auth?.users?.result?.name)
    const userCode = useSelector((state)=>state?.code?.userCodes)
    const {loading} = useSelector((state)=>state?.code)
    const [deleteToggle, setDeleteToggle] = useState(null);
    console.log(userCode)
    useEffect(()=>{
        if(userId){
           dispatch(getUserCodes(userId))
        }
    },[userId,deleteToggle])
      if(loading){
        return <Loader/>
      }
  return (
    <div className='dash'>
        <h1>Our Dashboard</h1>
        <div className="user">
          <FaUser size={20} /> <span>{name} </span>
        </div>
       {
        userCode && userCode.map((item,i)=>(
            <div key={item._id} className='user-code' > 
                  <div  className="user-code-card">
            <div className="pics">
                <img src={item.imageFile} alt="" />
            </div>
            <div className="usercode-info">
                <h3>{item.title}</h3>
                <p>{item.description.substring(0,50)}</p>
            </div>
            <div className="options">
                 <div className="delete">
                  <MdDelete onClick={()=>setDeleteToggle(item._id)}  size={25} />
                 </div>
                 <div className="edit">
                  <Link to={`/editcode/${item._id}`} > <TbEdit size={25} /> </Link>
                 </div>
            </div>
        </div>
        {
        deleteToggle === item._id ? <div className='delete-box'>
          <div className='cross' style={{ cursor: "pointer" }} onClick={() => setDeleteToggle(null)}> <RxCrossCircled size={25} /> </div>
          <p> Are you sure you want to delete this? </p>
          <div className="delete-btns">
            <button onClick={() => {
              dispatch(deleteUserCode(item._id));
              setDeleteToggle(null); // Hide confirmation after action
            }}>Yes</button>
            <button onClick={() => setDeleteToggle(null)}>No</button>
          </div>
        </div> : ""
      }
            </div>
        ))
       }
      
    </div>
  )
}

export default Dashboards


