const express=require('express');
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cookieParser = require('cookie-parser');  
const app=express();
const cor=require('cors');

dotenv.config({path:"./config/config.env"});

require('./db/conn');
app.use(cookieParser());
app.use(express.json());
app.use(cor());

//we link the router file 
app.use("/",require("./route/auth"));
const PORT=process.env.PORT || 5000;
// app.get("/about",(req,res)=>{
//     res.send(`hello from about server`);
//     console.log("hello about");
// });
app.get("/getdata",(req,res)=>{
    res.cookie("test",'thapa');
    res.send(`hello from contact server`);
});

if(process.env.NODE_ENV=="production"){
    app.use(express.static("front/build"))
}
app.listen(PORT, ( ) => {
     console.log(`server is running at port ${PORT}`);
});


