import React, { useState, useEffect, useContext } from 'react'
import "./post.css";
import { MoreVert, ThumbUpSharp, HeartBroken } from "@mui/icons-material";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

function Post({ post }) {
    // console.log("postt", post);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currUser } = useContext(AuthContext);

    const PF= " http://localhost:4000/images/";

    const likeHandler = () => {
        try {
            axios.put(`http://localhost:4000/api/posts/${post._id}/like`, { userId: currUser._id })
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(()=>{
        setIsLiked(post.likes.includes(currUser._id))
    }, [currUser._id, post.likes]);

    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:4000/api/user/${post.userId}`);
            console.log(res);
            setUser(res.data);
        }
        fetchUser();

    }, [post.userId]);

    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //TODO : ADD PUBLIC THING IN POST !

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF+user.profilePicture : PF+ "noavatar.png"} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <HeartBroken onClick={likeHandler} className="likeIcon" />
                        <ThumbUpSharp onClick={likeHandler} className="likeIcon" />
                        {/* <img src={`${PF}like.png`} alt="" className="likeIcon" /> */}
                        {/* <img src={`${PF}heart.png`} alt="" className="likeIcon" /> */}
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post