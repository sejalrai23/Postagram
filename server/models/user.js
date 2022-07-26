const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String , 
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String ,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicyure:{
        type:String,
        default:"",
    },
    followers:{
        type:Array, //array for storing user id 
        default:[],   
    },
    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50,
    },
    place:{
        type:String,
        max:50,
    },
    relation:{
        type:Number,
        enum:[1,2,3],
    },
}, {timestamps:true});

module.exports = mongoose.model('User', UserSchema);