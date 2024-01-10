import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedCodesByTags, getSingleCode } from '../redux/codeSlice';
import './Code.css'
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { ImPriceTags } from "react-icons/im";
import { MdOutlineEditCalendar, MdOutlineCreate } from "react-icons/md";
import Related from '../components/Related';
const Code = () => {
  const dispatch = useDispatch();
  const { codes, loading, error } = useSelector((state) => state.code);
  const { relatedCodes } = useSelector((state)=>({...state.code}))
  // console.log(relatedCodes)
  const tags = codes?.tags
  useEffect(()=>{
   tags && dispatch(getRelatedCodesByTags(tags))  
 },[tags])
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getSingleCode(id));
  }, [dispatch, id]);


  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {codes && (
        <div className='code-details'>
          <div className="code-title">
          <h1>{codes.title}</h1>
          </div>
         <div className="code-pic">
         <img src={codes.imageFile} alt={codes.title} />
         </div>
          <div className='code-info' > 
          <div className='creator'>
          <MdOutlineCreate/>
            <span> {codes.name}</span>
          </div>
          <div className='tagx'>
            <ImPriceTags/> 
            <span>
              {codes && 
              ( `#${codes.tags}`)}
            </span>
          </div>
          <div className='time'>
            <MdOutlineEditCalendar/>
             <span>
               { moment(codes.createdAt).fromNow()}
            </span>
          </div>
          <div className="desc">
            <p>{codes.description}</p>
          </div>
          </div>
        </div>
      )}
      <Related relatedCodes={relatedCodes} codeId={id} />
    </div>
  );
};

export default Code;
