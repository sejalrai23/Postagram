const { newMessage, getMessage } = require("../controllers/message");

const router = require("express").Router();

router.post("/message", newMessage);
router.get("/getmessage/:conversationId", getMessage);

module.exports=router;