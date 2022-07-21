const Post = require("../models/Post");
const User = require("../models/user");

exports.createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post =await Post.findOne({_id:req.params.id});
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("your post has been updated");
        } else {
            return res.status(400).json("you can't update others posts");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};


exports.deletePost=async(req,res)=>{
    try {
        const post =await Post.findOne({_id:req.params.id});
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("your post has been deleted");
        } else {
            return res.status(400).json("you can't delete others posts");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.likePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes:req.body.userId}});
            return res.status(200).json("you liked this post");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("you disliked this post");

        }
    }catch(err){
        return res.status(500).json(err);
    }
}

exports.getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);

    }catch(err){
        return res.status(500).json(err);
    }
}

exports.getTimeline=async(req,res)=>{
    let postArray=[];
    try{
        // console.log("p---",req.params.id);
        const currUser= await User.findOne({_id:req.params.id});
        // console.log("curr:", currUser);
        const userPosts= await Post.find({userId: currUser._id});
        const friendPosts=await Promise.all(     //promise because we are using map here await wont fetch all and map wont work
            currUser.following.map((Id)=>{
                console.log("friend", Id);
                return Post.find({userId: Id});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));


    }catch(err){
        return res.status(500).json(err);
    }
}

exports.getUsersPost=async(req, res)=>{
    try{
        const user=await User.findOne({username:req.params.username});
        // console.log("getUsersPost",user);
        const posts=await Post.find({userId: user._id});
        // console.log("posts",posts);
        res.status(200).json(posts);

    }catch(err){
        return res.status(500).json(err);
    }
}


