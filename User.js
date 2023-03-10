const mongoose = require("mongoose")
const schema = mongoose.Schema
 const userSchema = new schema({
    userID : {
        type:Number,
        required : true,
        unique:true
    },
    userName: {
        type:String,
        require:true,
        unique :true
    },
    email : {
        type:String,
        require :true,
        unique :true
    },
    password : {
        type:String,
        require:true
    },
    phone : {
        type:Number
    },
    token : {
        type:String
    },
    role : {
        type:String,
        default  : "user"
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
        default :Date.now
    },
    profile :[
        {   
            tags : {
            type:String
        }},
        {
            following : {
            type:String
        }}
    ],
    account_status : {
        type :String ,
        default : "active"
    }
 })
 const userModal = mongoose.model("user",userSchema );
 module.exports =userModal;