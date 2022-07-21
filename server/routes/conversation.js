const router = require("express").Router();
const {newConversation, getConversation} = require("../controllers/conversation");

//
router.post("/conversation", newConversation);
router.get("/getconversation/:userId", getConversation);






module.exports = router;

