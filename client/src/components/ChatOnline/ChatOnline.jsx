import React from 'react'
import "./ChatOnline.css";

function ChatOnline() {
    const PF="http://localhost:4000/images/";
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
            <img src={PF+"noavatar.png"} alt="" className="chatOnlineImg" />
            <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">
            visheshh
        </div>
        </div>
    </div>
  )
}

export default ChatOnline