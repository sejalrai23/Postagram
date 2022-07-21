const Conversation = require("../models/Conversation");


exports.newConversation=async (req, res)=>{
    const newConversation = new Conversation({
        members : [req.body.senderID , req.body.recieverID],
    });

    try{
        const savedConversation= await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }

}


exports.getConversation=async(req,res)=>{
    try{

        const conversation= await Conversation.find({
            members : {$in: [req.params.userId]},
        })
        res.status(200).json(conversation);

    }catch(err){
        res.status(500).json(err);
    }
}