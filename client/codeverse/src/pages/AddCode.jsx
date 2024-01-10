import React, { useEffect, useRef, useState } from 'react';
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { createCode } from '../redux/codeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AddCode.css'
const initialState = {
  title: "",
  description: "",
  tags: [],
  imageFile: null
};

const AddCode = () => {
  const dispatch = useDispatch();
  const [codeData, setCodeData] = useState(initialState);
  const { title,description ,tags, imageFile } = codeData;
  const error = useSelector((state) => state.code.error);
  const user = useSelector((state) => state?.auth?.users?.result);
  const editor = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);



  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setCodeData({ ...codeData, tags: [...codeData.tags, tag] });
  }

  const handleDeleteTag = (tagToDelete) => {
    setCodeData({ ...codeData, tags: codeData.tags.filter((tag) => tag !== tagToDelete) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedData = { ...codeData, name: user.name };
      dispatch(createCode(updatedData));
      navigate('/')
    }
  };

  return (
    <div className='addcode'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ height: "3rem" }}
          placeholder='Enter the Title'
          value={title}
          name='title'
          onChange={onInputChange}
          required
        /> <br />

        <textarea
        placeholder='Enter description'
        value={description} 
        name="description"
        onChange={onInputChange}  
        cols="30" 
        rows="10"></textarea> <br />

         <div className='tags' >
         <ChipInput
          style={{ color: "white", width: "20rem", border: "2px solid white", borderRadius: "10px" }}
          name="tags"
          variant='outlined'
          placeholder='Enter tag'
          value={tags}
          onAdd={(tag) => handleAddTag(tag)}
          onDelete={(tag, index) => handleDeleteTag(tag, index)}
        />
         </div>
          <br />

        {/* Image Upload */}
        <div className='imgfile'>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setCodeData({ ...codeData, imageFile: base64 })}
          />
        </div> <br />
        {imageFile && <img src={imageFile} alt="img" height={"200px"} />} <br />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddCode;
