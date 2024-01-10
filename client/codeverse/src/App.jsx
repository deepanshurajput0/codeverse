import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsers } from './redux/userSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddCode from './pages/AddCode';
import Code from './pages/Code';
import Dashboards from './pages/Dashboards';
import PrivateRoute from './components/PrivateRoute';
import EditCode from './pages/EditCode';
import TagCodes from './pages/TagCodes';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user from localStorage
    const user = JSON.parse(localStorage.getItem('profile'));
    // Dispatch action to set user in Redux store
    dispatch(setUsers(user));
  }, [dispatch]); // Ensure this effect runs only once after component mount

  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/addcode" element={ <PrivateRoute>
            <AddCode />
          </PrivateRoute>          
          } />
          <Route path="/code/:id" element={<Code />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboards/>
            </PrivateRoute>
          } />
          <Route />
          <Route path='/editcode/:id' element={<PrivateRoute>
            <EditCode/>
          </PrivateRoute>} />
          <Route path='/codes/search' element={<Home/>}  />
          <Route path='/codes/tags/:tag' element={<TagCodes/>} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
