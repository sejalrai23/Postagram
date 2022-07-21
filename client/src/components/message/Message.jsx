import React from 'react'
import "./Message.css"
import {format} from "timeago.js";

function Message({message , own}) {
  const PF="http://localhost:4000/images/"
  return (
    <div className={own ? "Message own" : "Message"}>
        <div className="messageTop">
            <img src={PF+ "noavatar.png"} alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message