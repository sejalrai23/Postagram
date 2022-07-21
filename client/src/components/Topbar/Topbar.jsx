import React, {useContext} from "react";
import "./Topbar.css"
import {Search, Person, Chat , Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Topbar=()=>{
  const user= useContext(AuthContext);
  console.log("topbar", user.user.username);
    return(
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">
            Postagramm
          </span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon"/>
            <input type="text" placeholder="search...." className="searchInput"/>
          </div>
        </div>
          
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">
                Homepage
            </span>
            <span className="topbarLink">
                Timeline
            </span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
                <Person/>
                <span className="topbarIconBadge">
                  1
                </span>
            </div>
            <div className="topbarIconItem">
                <Chat/>
                <span className="topbarIconBadge">
                  1
                </span>
            </div>
            <div className="topbarIconItem">
                <Notifications/>
                <span className="topbarIconBadge">
                  1
                </span>
            </div>
          </div>
          
          <Link to={`/profile/${user.user.username}`}>
          <img src="/assets/profile.jfif" alt="" className="topbarImg" />
          </Link>

         
        </div>
       
      </div>
    );
}
 // TODO  : CHANGE IMAGE HERE


export default Topbar;