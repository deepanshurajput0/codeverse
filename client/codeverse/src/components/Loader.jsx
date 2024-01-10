import React from 'react'
import { TailSpin } from "react-loader-spinner"
const Loader = () => {
  return (
    <div style={{display:'flex', justifyContent:"center", alignItems:"center", height:"90vh"}} >
        <TailSpin
  visible={true}
  height="80"
  width="80"
  color="orange"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loader


