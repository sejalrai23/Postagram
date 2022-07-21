import React, {useState, useEffect, useContext} from 'react'
import "./feed.css"
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
const Feed=({username})=> {
  const [posts, setPosts]=useState([]);
  const {user}= useContext(AuthContext);
  console.log("feed", user._id);
  useEffect(()=>{

     const fetchPost=async()=>{
      const res=username 
              ? await axios.get(`http://localhost:4000/api/profile/${username}`) 
              :await axios.get(`http://localhost:4000/api/timeline/${user._id}`);
      console.log(res);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
     }
     fetchPost();
     
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=>(
          // console.log(p)
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  );
  
}

export default Feed;