const mongoose=require('mongoose');
// const DB=process.env.DATABASE;


        // const url='mongodb+srv://deepakthakurnita:h1PHvQXRdI1K6hFd@cluster0.jyejpko.mongodb.net/BLOG?retryWrites=true&w=majority';
        const DB= 'mongodb+srv://deepakthakurnita:h1PHvQXRdI1K6hFd@cluster0.jyejpko.mongodb.net/BLOG?retryWrites=true&w=majority';
mongoose.connect(DB)
.then(()=>{console.log('Connection Successful')})
.catch((err)=>{console.log(err)})

