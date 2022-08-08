const mongoose=require("mongoose");
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log(`connection sucessful`);
}).catch((e)=>{
    console.log(e.message)
    console.log(`no connection`);
})