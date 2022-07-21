const User=require("../models/user");
const bcrypt = require("bcrypt");

exports.updateUser=async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(404).json(err);
            }
        }
        try{
            const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(404).json(err);
        }
    }else{
        return res.status(404).json("you can update your account only")
    }
}

exports.deleteUser=async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            const user=await User.deleteOne({_id:req.params.id});  // we can even use findByIdandDelete
            res.status(200).json("Acoount has been deleted Succesfully");
        }catch(err){
            return res.status(404).json("error", err);
        }
    }else{
        return res.status(404).json("you can delete ypur account only")
    }
}

exports.getUser=async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password , updatedAt , ...other}=user._doc;
        res.status(200).json(other);

    }catch(err){
        return res.status(404).json(err);
    }
}

exports.getUserbyname=async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username});
        const {password , updatedAt , ...other}=user._doc;
        res.status(200).json(other);

    }catch(err){
        return res.status(404).json(err);
    }
}

exports.getFriends=async(req,res)=>{
    try{
        const user= await User.findById(req.params.userId);
        const friends= await Promise.all(
            user.following.map(fId=>{
                return User.findById(fId);
            })
        );
        let friendList=[];
        friends.map(f=>{
            const {_id , username , profilePicture}= f;
            friendList.push({_id, username , profilePicture});
        });
        res.status(200).json(friendList);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.followUser=async(req,res)=>{
    if(req.body.userId!== req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const curUser= await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await curUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("followed this user succesfully");

            }else{
                return res.status(404).json("You already follow this user");
            }

        }catch(err){
            res.status(404).json(err);
        }

    }else{
        return res.status(404).json("you cannot follow yourself!")
    }
}

exports.unfollowUser=async(req,res)=>{
    if(req.body.userId!== req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const curUser= await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await curUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("unfollowed this user succesfully");

            }else{
                return res.status(404).json("You dont follow this user");
            }

        }catch(err){
            res.status(404).json(err);
        }

    }else{
        return res.status(404).json("you cannot unfollow yourself!")
    }
}

