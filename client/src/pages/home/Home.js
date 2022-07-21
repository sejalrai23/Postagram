import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"
import RightBar from "../../components/rightBar/RightBar";
import Feed from "../../components/feed/Feed"
import "./home.css"
import Profile from "../Profile/Profile";


export default function Home(){
    return(
        <div>
            <Topbar/>
            <div className="home_container">
            <Sidebar/>
            <Feed/> 
            <RightBar/>
            {/* <Profile/> */}
            

            </div>

        </div>
    );
}