const User= require("../models/user");
const router= require("express").Router();
const {updateUser,deleteUser,getUser,followUser,unfollowUser,getUserbyname, getFriends}=require("../controllers/user");

//update user:
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);
router.get("/username/:username", getUserbyname);
router.put("/user/:id/follow",followUser);
router.put("/user/:id/unfollow", unfollowUser)
router.get("/user/friends/:userId",getFriends);
 module.exports=router;