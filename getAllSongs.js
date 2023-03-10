const express = require("express");
const  musicModal= require("../../Modal/musicModal");

const app = express();
app.get("/" ,async (request,response)=>{
    const music = await musicModal.find({}).clone().catch(err=>console.log(err))
    response.status(200).send(music)
    console.log(music)
})
module.exports = app;