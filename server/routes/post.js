const router= require('express').Router();
const {createPost,updatePost,deletePost, likePost, getPost, getTimeline, getUsersPost}=require("../controllers/post");

router.post("/posts", createPost);
router.put("/posts/:id",updatePost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id/like", likePost);
router.get("/posts/:id", getPost);
router.get("/timeline/:id",getTimeline)
router.get("/profile/:username",getUsersPost);
module.exports=router;