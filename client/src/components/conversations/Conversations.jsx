import axios from 'axios';
import React , {useState , useEffect} from 'react'
import "./conversations.css"

function Conversations({convo, currUser}) {

  const PF="http://localhost:4000/images/"

  const [user, setUser]= useState(null);

  useEffect(() => {
    const friendId= convo.members.find(m=> m!== currUser._id);

    const getuser =async()=>{
      try{
      const res= await axios(`http://localhost:4000/api/user/${friendId}`);
      // console.log("friendconvo", res);
      setUser(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getuser();
  }, [convo, currUser])
  

  return (
    <>
    <div className='conversation'>
        <img className='conversationImg' src={  PF+"noavatar.png"} alt=""/>
        <span className="conversationName">{user ? user.username : ""}</span>
    </div>
    </>
  )
}

export default Conversations