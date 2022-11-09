const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express =require('express');
const app=express();
const cookieParser = require('cookie-parser')
var cors = require('cors')
 const validator=require('validator');
const port =process.env.PORT||8000;
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

dotenv.config({path:'./config.env'});
 require('./db/conn');
 app.use(require('./router/Auth'));
app.get('/',(req,res)=>{
    res.status(200).send("Home Page");
});
app.listen(port,()=>{
    console.log(`Connection is succesful at ${port}`);
})

