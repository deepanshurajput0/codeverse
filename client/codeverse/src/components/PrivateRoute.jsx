import React from 'react'
import { useSelector } from 'react-redux'
import LoadingtoRedirect from '../pages/LoadingtoRedirect'
const PrivateRoute = ({children}) => {
    const user = useSelector((state)=>state?.auth?.users?.result)
  return user ? children : <LoadingtoRedirect/>
}

export default PrivateRoute

