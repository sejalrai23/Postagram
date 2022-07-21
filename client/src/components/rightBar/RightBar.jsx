import React , {useEffect, useState, useContext} from 'react'
import "./rightbar.css";
import {Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from "@mui/icons-material";

const RightBar=({user})=> {
  console.log("rightBar", user);
  const[friends, setFriends]=useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );
  useEffect(()=>{
      const getFriends=async()=>{
        try{
          const friendList= await axios.get(`http://localhost:4000/api/user/friends/${user._id}`);
          setFriends(friendList.data);

        }catch(err){
          console.log(err);
        }
      };
      getFriends();  //cant use async inside use effect
  }, [user]);
  const PF="http://localhost:4000/images/"

  // console.log(friends);
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:4000/api/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:4000/api/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar=()=>{
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/giftt.png" alt=""/>
          <span className='birthdayText'><b>Swann</b> and <b>2 others </b>have their birthdays today!
          </span>
          <img className='rightbarAd' src="/assets/add.jfif" alt=""/>
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            <li className="rightbarFriend">
              <div className="rightbarProfileContainer">
                <img src="/assets/profile.jfif" alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className='rightbarUsername'>Spawnn</span>
            </li>
            
          </ul>
        </div>
       
      </>
    );
  }

  const ProfileRightbar=()=>{
    return (
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
      <h4 className='rightbartitle'>User Information</h4>
      <div className='rightbarInfo'>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.place}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">RelationShip:</span>
          <span className="rightbarInfoValue">{user.relation===1 ? "Single🥱" : user.relation==2  ? "Married💞" : "Commited💋"}</span>
        </div>

      </div>
      <h4 className='rightbartitle'>User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map(f=> (
          

          <Link to={`/profile/${f.username}`} style={{textDecoration: "none" }}>
          <div className="rightbarFollowing">
          <img src={f.profilePicture ? PF + f.profilePicture : PF+"noavatar.png"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{f.username}</span>
          </div>
          </Link>

        )
        )}       
      </div>
      </>
    );
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        
        {/* {user ? <ProfileRightbar/> : <HomeRightbar/>}
         */}
         <HomeRightbar/>
      </div>
    </div>
  )
}

export default RightBar