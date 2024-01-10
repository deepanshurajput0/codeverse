import React from 'react'
import '.././pages/CodeCard.css'
import { Link } from 'react-router-dom'
const Related = ({relatedCodes, codeId}) => {
    console.log(relatedCodes)
  return (
    <div style={{display:"flex", justifyContent:"center"}} >
        {
            relatedCodes && relatedCodes.length > 0 && (
                <>
                {relatedCodes.length>1 && ( <h1 style={{position:"absolute", left:"40%"}} >Related Codes</h1>)  }
                {relatedCodes.filter((item)=>item._id !== codeId).splice(0,3).map((items)=>(
                     <div className='code-card' style={{marginTop:"100px"}}>
     
     <div className="pic">
        <img src={items.imageFile} alt="" />
     </div>
     <div className='code-sec'>
     <div className="title">
         <h3>{items.title}</h3>
        </div>
        <div className="para">
        <p>{items.description && items.description.length > 45 && (items.description.substring(0, 100) + '...')}</p>

        </div>
        <div className='name'>Name-{items.name}</div>
        <div className="tags">
         Tags -
        <span> {items.tags.map((tag)=>
        <Link style={{textDecoration:"none",color:"orange"}}  to={`codes/tags/${tag}`} >#{tag}</Link>
        )}</span>
        </div>
        <button>
         <Link style={{textDecoration:"none", color:"black"}} to={`/code/${items._id}`} >Read More</Link>
        </button>
     </div>
   </div>
                ))
                }
                </>
            )
        }
    </div>
  )
}

export default Related


