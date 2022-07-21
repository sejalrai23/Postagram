import React, {useState, useContext} from "react";
import {Person} from  "@mui/icons-material"
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Messenger from "./pages/messenger/Messenger";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";




const App = () => {
  const {user}= useContext(AuthContext);
  return (
    <div >
      <Routes>
      <Route exact path="/" element={
          user ? <Home /> :<Login/>
        } />
         <Route  path="/signup" element={
         user ? <Navigate to="/" /> :<Register />} 
        />
        <Route  path="/login" element={user ? 
        <Navigate to="/"/> :<Login />} />
       <Route  path="/messenger" element={
         !user ? <Navigate to="/" /> :<Messenger />} 
        />
        
        <Route  path="/profile/:username" element={<Profile />} />
      </Routes>

    </div>
  )
}


export default App;