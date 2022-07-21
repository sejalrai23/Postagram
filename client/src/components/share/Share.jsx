

import React , {useContext, useState, useRef} from "react";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const[file, setFile]=useState(null);
  const {user}= useContext(AuthContext);
  const desc= useRef();

  const submitHandler=async (e)=>{
    e.preventDefault();

    const newPost={
      userId: user._id,
      desc: desc.current.value
    }

    if(file){
      const data=new FormData();
      const fileName= Date.now()+ file.name;
      data.append("name", fileName );
      data.append("file", file );
      newPost.img= fileName;
      try{
        const res=await axios.post("http://localhost:4000/api/upload", data);
        console.log(res);

      }catch(err){
        console.log(err);
      }
    }

    try{
        const res= await axios.post("http://localhost:4000/api/posts", newPost);
        console.log(res);
        window.location.reload();
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {/* *TODO : change image */}
          <img className="shareProfileImg" src="/assets/profile.jfif" alt="" />
          <input
            placeholder={"What's in your mind" +user.username+ "?"}
            className="shareInput" ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        <form onSubmit={submitHandler} className="shareBottom">
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png , .jpeg, .jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}