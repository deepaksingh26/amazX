const jwt =require("jsonwebtoken");
const User=require('../model/userschema');
const middleware=  async (req,res,next) =>{
 try{
// console.log(`I have entered to middleware `);
// console.log("cookie",req.cookies)
// const token=req.cookies.jwt;
// console.log(` token from now ${token}`);
// const verifytoken=jwt.verify(token,"MYNAMEISDEEPAKBHAIYAJOBANEGABIDHAYAK");
// console.log(`hello ${verifytoken._id}`);
// const rootUser= await User.findOne({_id:verifytoken._id,"tokens.token":token});
// console.log(`hello ${rootUser.fName}`);
// if(!rootUser)
// {
//    throw new Error('User not found');
// }
const token=req.headers.authorization
// console.log(token)
if(token){
   jwt.verify(token, 'MYNAMEISDEEPAKBHAIYAJOBANEGABIDHAYAK',async function(err,dectoken ) {
      req.rootUser=await User.findById(dectoken._id);
      console.log("hi",req.rootUser);
      next();
    });
   // console.log(rootUser);
}
else{
    res.status(401).send('unotherized');
}


 }catch(e){
    res.status(401).send('unotherized');
    console.log(e);
 }
}
module.exports=middleware;