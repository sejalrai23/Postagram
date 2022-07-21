import React, {useState, useEffect} from 'react'
import Topbar from "../../components/Topbar/Topbar";
import RightBar from '../../components/rightBar/RightBar';
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./Profile.css";
import axios from "axios"; 
import {useParams} from "react-router";

function Profile() {
  const [ user, setUser]=useState({});
  const params= useParams();
  const PF= " http://localhost:4000/images/";

  useEffect(()=>{

    const fetchUser=async()=>{
    const res=await axios.get(`http://localhost:4000/api/username/${params.username}`);
    console.log(res);
    setUser(res.data);
    }
    fetchUser();
    
 }, []);
  return (
    <>
    <Topbar/>
    <div className='profile'>
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img src={user.coverPicyure
? PF + user.coverPicyure
: PF+"nocover.jfif"} alt="" className="profileCoverImg" />
            <img src={user.profilePicture

? PF + user.profilePicture

: PF+"noavatar.png"} alt="" className="profileUserImg" />
            </div>

            <div className="profileInfo">
                <h4 className='profileInfoName'>{user.username}</h4>
                <span className='profileInfoDesc'>{user.desc}</span>
            </div>

        </div>
        <div className="profileRightBottom">
        <Feed username={params.username} />
        <RightBar user={user}/>
        </div>



      
      </div>

    </div>
    </>
  )
}

export default Profile