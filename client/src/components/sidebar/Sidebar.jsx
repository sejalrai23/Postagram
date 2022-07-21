import React from "react";
import "./sidebar.css"
import {RssFeed} from "@mui/icons-material"

const Sidebar=()=>{
    return(
        <div className="sidebar">
          <div className="sidebarWrapper">
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <RssFeed className="sidebarIcon"/>
                <span className="sidebarListItemText">
                  Feed
                </span>
              </li>
              <li className="sidebarListItem">
                <RssFeed className="sidebarIcon"/>
                <span className="sidebarListItemText">
                  Feed
                </span>
              </li>
              <li className="sidebarListItem">
                <RssFeed className="sidebarIcon"/>
                <span className="sidebarListItemText">
                  Feed
                </span>
              </li>
            </ul>
            <button className="sidebarButton">
              Show More
            </button>
            <hr className="sidebarHr"/>
            <ul className="sidebarFriendList">
              <li className="sidebarFriend">
                <img src="/assets/profile.jfif" alt="" className="sidebarFriendImg" />
                <span className="sidebarFriendName">swann</span>
              </li>
            </ul>
          </div>
        </div>
    )
}

export default Sidebar;