const User=require("../models/user");
const bcrypt = require('bcrypt');

exports.register=async (req , res)=>{
  
    try{
        const salt = await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(req.body.password,salt);
        const user= new User({
            username: req.body.username,
            email : req.body.email,
            password: hash,
        });
        const new_user = await user.save();
        res.status(200).json(new_user);
    }catch(err){
        console.log(err);
    }
}

exports.login=async(req,res)=>{
    try{
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found!");

    const validatePass= await bcrypt.compare(req.body.password, user.password);
    !validatePass && res.status(400).json("password you entered is incorrect");

    res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}