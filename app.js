const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors =require('cors');
const cookieParser=require('cookie-parser')

//requiring dotenv file
dotenv.config({path:'./config/config.env'})
const PORT=process.env.PORT || 7500;

//requiring connection to mongoDB
require('./db/conn');


//recieve data from frontend in json format
app.use(cookieParser()) 
app.use(express.json());
// app.use(cors()); 

const allowedOrigins=['https://euphonious-pothos-0feb65.netlify.app'];

const corsOptions = {
    origin: function (origin, callback)  {
        if (!origin || allowedOrigins.indexOf(origin) !==-1)  callback(null, true);
        else {
             callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));
if(process.env.NODE_ENV==="production"){
    app.use(express.static("frontend/build"))
}


app.use(require('./router/adminRouter'))
app.use(require('./router/employeeRouter'))


app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));
