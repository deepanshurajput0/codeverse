import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCodeByTags } from '../redux/codeSlice'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import './TagCodes.css'
const TagCodes = () => {
    const dispatch = useDispatch()
    const tagCodes = useSelector((state)=>state?.code?.tagCodes)
    const { loading } = useSelector((state)=>({...state?.code}))
    const { tag } = useParams()

    if(tag){
      useEffect(()=>{
        dispatch(getCodeByTags(tag))
      },[tag])
    }
    if(loading){
      return <Loader/>
    }
  return (
    <div>
         <h2 style={{textAlign:'center', marginTop:"30px"}} >Codes By This Tag : {tag}</h2>

          {
            tagCodes && tagCodes.map((item,i)=>{
              return(
                <div className="tag-card">
           <div className='tag-sec'>
           <img src={item.imageFile} alt="" />
             <div className="tag-info">
              <h3>{item.title}</h3>
              <p>{item.description.substring(0,90)}</p>
              <Link to={`/code/${item._id}`} >
              <button >Read More</button>
              </Link>
             </div>
           </div>
         </div>
              )
            })
          }
    </div>
  )
}

export default TagCodes


