const express=require("express");
const { default: mongoose } = require("mongoose");
const env=require('dotenv');
const helmet=require("helmet");
const morgan= require("morgan");
const authRoutes= require("./routes/auth");
const userRoutes=require("./routes/user");
const postRoutes = require("./routes/post");
const conversationRoutes= require("./routes/conversation");
const messageRoutes= require("./routes/message");
const cors= require('cors');
const multer=require("multer");
const path= require("path");


const app= express();
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qbtkz.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("database connected");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use(cors());
app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));
const storage=multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null, "public/images");
    },
    filename:(req,file,cb)=>{
        cb(null, req.body.name);
    },
});
const upload=multer({storage : storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("file uploaded successfully!");
    }catch(err){
        console.log(err);
    }
})

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api", postRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});


