const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt=require('jsonwebtoken');
const express=require("express");
const { findOne } = require("../model/userschema");
const router=express.Router();
const middleware=require('../middleware/middleware');


require('../db/conn');

const User=require("../model/userschema");

router.post("/register",async(req,res)=>{

    const {fName,email,phone,pass,cpass}=req.body;
    console.log(req.body);

   if(!fName||!email||!phone||!pass||!cpass) 
   {  

       return res.status(404).json({error:"plz fill the field properly "});
   }
   try{
    const userEsist=await User.findOne({email:email})

    if(userEsist){
        return res.status(422).json({error:"Email Already Exist"});
    }
    else if(pass !=cpass)
    {
        return res.status(422).json({error:"please enter password carefully"});
    }
    else{
    const user =new User({fName,email,phone,pass,cpass});
        //sequreing paasword
        await user.save();
        // console.log("user",user)
        res.status(201).json({message:"User registred sucessfully"});
       }
    }
    catch(err){console.log(err);}
});

router.post('/signin',async (req,res)=>{
    try{
        const {email,pass}=req.body;
        console.log("body",req.body)
        if(!email||!pass)
        {   
            return res.status(400).json({error:"fill the field properly"});
        }
        const userLongin=await User.findOne({email:email});
        // console.log('userLongin',userLongin)
        if(userLongin)
        {
            
        const isMatch=await bcrypt.compare(pass,userLongin.pass);
         const token=await userLongin.generateAuthToken();
        //  console.log("signin token check",token);

        if(!isMatch)
        {
            res.status(400).json({error:"Invalid Credentials "});
        }
        else
        {
            res.status(200).json({
                status:true,
                token:token
            })
            // res.json({message:"user Singnedin Successfully"});
        }
        }
        else
        {
            res.status(400).json({error:"Invalid Credentials"});
        }
        
    }catch(e){
        console.log(e);
    }
});
//get userdata for contact us and homepage
router.get("/getdata",middleware,(req,res)=>{
    //   console.log(`middleware sorted ${req.rootUser}`);
      res.status(200).json(req.rootUser);
    res.send({message:"hii, this is backend"});
});


router.post('/deepak',middleware,async (req,res)=>{
   try
   {  
    console.log("/deepak", req.body);
   const { fName, email,phone,msg } = req.body;
      if(!fName||!email||!phone||!msg)
      {   
          return res.json({message:"Plzz fill the field properly"});
      }
       const userContact=await User.findOne({_id:req.body.id});
       console.log("userContact",userContact)
       if(userContact)
      {
       await userContact.addMessage(fName,email,phone,msg);
       await userContact.save();
       res.status(201).json({message:"user contact sucessfully"});
     }
     else{
         console.log('apdi iipode');
     }
   }
   catch(e)
   {
       console.log(e);
   }
});


router.get("/logout",middleware,(req,res)=>{
    console.log("Log out bala page");
    res.clearCookie('jwt',{path:'/'});
  res.status(200).send('User log out');
});

module.exports=router;



// router.post("/register",(req,res)=>{

//     const {name,email,phone,work,password,cpassword}=req.body;

//    if(!name||!email||!phone||!work||!password||!cpassword) 
//    {
//        return res.status(404).json({error:"plz fill the field properly"});
//    }


//    User.findOne({email:email})
//    .then((userEsist)=>{
//        if(userEsist){
//            return res.status(422).json({error:"Email Already Exist"});
//        }
//        const user =new User({name,email,phone,work,password,cpassword});
//        user.save()
//        .then(()=>{
//            res.status(201).json({message:"User registred sucessfully"});
//        }).catch(err=>{
//            res.status(500).json({error:"Failed to register"});
//        })
//    }).catch(err=>{
//        console.log(err);
//    })
// });




//contact us page 
// router.post("/deepak", async (req,res)=>
// {
//  const [fName,email,phone,msg ]=req.body;
// console.log(res.body);
// res.status(200).json({message:"data not found"});
// if(!fName||!email||!phone||!msg)
// {
//     console.log('error in contact form');
//     return res.json({message:"plzz fill the contact form properly"});
// }
//     try
//     {
// const userContact=await User.findOne({
//     _id:req.userId,
// })
// // console.log(`usercontact ${userContact}`);
// if(userContact)
// {   
//     const userMessage=await userContact.addMessage(fName,email,phone,msg);
//     await userContact.save();
//     res.status(201).json({message:"user contact sucessfylly"});
// }
//     }
//     catch(e)
//     {
//         console.log(`its from catch `);
//     }