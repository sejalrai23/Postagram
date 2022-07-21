import React, {useContext, useState, useEffect, useRef} from 'react';
import "./Messenger.css"
import Topbar from '../../components/Topbar/Topbar';
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import {AuthContext} from "../../context/AuthContext";

import axios from "axios";
import {io} from "socket.io-client";


function Messenger() {
  const [conversation , setConversation]= useState([]);
  const[ currChat , setCurrChat]= useState(null);
  const [ message , setMessage]= useState([]);
  const [newMessage , setNewMessage]= useState("");
  const {user}= useContext(AuthContext);
  // const [socket , setSocket]=useState(null);
  const socket= useRef();
  const scrollRef= useRef()


   useEffect(() => {
     socket.current=io("ws://localhost:8800")
  }, [])


  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers",(users)=>{
      console.log("*");
      console.log("online",users);
    })
  }, [user])

 
  
  
  
  useEffect(() => {
    const getConversations= async()=>{
      try{
      const res= await axios.get(`http://localhost:4000/api/getconversation/${user._id}`);
      console.log("conversation", res);
      setConversation(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getConversations();
  }, [user._id]);

  useEffect(()=>{
     const getMessages= async()=>{
      try{
      const res= await axios.get(`http://localhost:4000/api/getmessage/${currChat?._id}`);
      console.log("messages",res);
      setMessage(res.data);
      }catch(err){
        console.log(res);
      }
     }
     getMessages();
  }, [currChat]);


  const handleSubmit=async(e)=>{
      e.preventDefault();
      const sendmessage={
        sender:user._id,
        text: newMessage,
        conversationId: currChat._id
      };
      try{
          const res=await axios.post(`http://localhost:4000/api/message`, sendmessage);
          setMessage([...message, res.data ])
      }catch(err){
        console.log(err);
      }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  
  

  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='search for friends' className='chatMenuInput' />
                {conversation.map((c)=>(
                  <div onClick={()=>setCurrChat(c)}>
                  <Conversations convo={c} currUser={user} />
                  </div>
                ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
              {currChat ? 
              (<>
              <div className="chatBoxTop">
                {message.map((m)=>(
                  <div ref={scrollRef}>
                  <Message message={m} own={m.sender===user._id}/>
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea className='chatMessageInput' placeholder='write your message..' onChange={(e)=>setNewMessage(e.target.value)}>
                </textarea>
                <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
              </div>
              </> )
              : (<span className='noconvoText'>Open a conversation to start a chat</span>
              )}
              </div>
            
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
               <ChatOnline/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Messenger