const io=require("socket.io")(8800, {
    cors:{
        origin: "http://localhost:3000",
    },
});

let users=[];

const addUser=(userId , socketId)=>{
    !users.some((u)=> u.userId=== userId) &&
        users.push({userId, socketId});
}

const removeUser=(socketId)=>{
    users= users.filter((user)=>user.socketId!== socketId);

}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

io.on("connection", (socket)=>{
    console.log("user connected");
    // io.emit("Welcome ,hello from socket server ");
    socket.on("addUser",(userId)=>{
        addUser(userId , socket.id);
        io.emit("getUsers", users);
    })

    socket.on("disconnect" , ()=>{
        console.log("user diconencetd");
        removeUser(socket.id);
    })


})