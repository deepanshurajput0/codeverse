import React from 'react'
import './CodeCard.css'
import { Link } from 'react-router-dom'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { likeCodes } from '../redux/codeSlice';
import { MDBTooltip } from "mdb-react-ui-kit"
const CodeCard = ({title, description, tags, name , _id, imageFile, likes}) => {
  const { users } = useSelector((state)=>({...state.auth}))
  // console.log(users)
  const userId = users?.result._id || users?.result?.googleId
  console.log(userId)
  // console.log(userId)
  const dispatch = useDispatch()
 const Likes =()=>{
  if(likes.length > 0){
    return likes.find((like)=> like === userId) ? (
      <>
      <FaHeart style={{marginRight:"10px"}} color='#F33A6A' size={20}  />
       &nbsp; 
       {likes.length > 2 ? (
        <MDBTooltip tag={"a"} title={`You and ${likes.length - 1} other likes`} >
           {likes.length} Likes
        </MDBTooltip>
       ) : (`${likes.length}  Like${likes.length > 1 ? 's' : ''}`) }
      </>
    ):(
      <>
       <div>
        <FaRegHeart/>
        <div>
          {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </div>
       </div>
      </>
    )
  }
    return(
       <div style={{display:"flex", alignItems:"center"}} >
       <FaRegHeart size={20} />
         <div style={{marginLeft:"10px"}}>
         &nbsp;Like
         </div>
       </div>
    )
 }
 const handleLike=()=>{
   dispatch(likeCodes({_id}))
 }
  return (
    <div className='code-card' >
     
      <div className="pic">
         <img src={imageFile} alt="" />
      </div>
      <div style={{marginLeft:'10px',marginTop:'10px'}} onClick={handleLike} >
      <Likes/>
      </div>
      <div className='code-sec'>
      <div className="title">
          <h3>{title}</h3>
         </div>
         <div className="para">
         <p>{description && description.length > 45 && (description.substring(0, 100) + '...')}</p>

         </div>
         <div className='name'>Name-{name}</div>
         <div className="tags">
          Tags -
         <span> {tags.map((tag,i)=>
         <Link key={i} style={{textDecoration:"none",color:"orange"}}  to={`codes/tags/${tag}`} >#{tag}</Link>
         )}</span>
         </div>
         <button>
          <Link style={{textDecoration:"none", color:"black"}} to={`/code/${_id}`} >Read More</Link>
         </button>
      </div>
    </div>
  )
}

export default CodeCard


