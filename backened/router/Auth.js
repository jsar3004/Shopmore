const express=require('express');
const {User} = require('../model/userschema');
const {Cart}=require('../model/userschema');
const {Contactus}=require('../model/userschema');
const bcrypt=require('bcrypt');
var ObjectId = require('mongodb').ObjectId; 
const jwt=require('jsonwebtoken');
const app=express();
const { db } = require('../model/userschema');
var cors = require('cors')
const Authenticate=require('../middleware/authenticate');
require('../db/conn')
const router =express.Router();
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
router.get('/cartts',(req,res)=>{
 Cart.find((err,data)=>res.status(200).send(data));
});
router.get('/contactusalldata',(req,res)=>{
  Contactus.find((err,data)=>res.status(200).send(data));
 });
router.post('/contactusdata',async(req,res)=>{
  
  const {name,email,phno,message} =req.body;
  const contact=new Contactus({name,email,phno,message});
  await contact.save();
  return res.status(200).json({message:"form filled succesfully"});
}  );
router.post('/register',async (req,res)=>{
const {email,password} = req.body;
  try{
    const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exist"});
        }
        const user=new User({email,password});
        await user.save()
        return res.status(201).json({message:"user registered Succesfully"});
    }
     catch (err){ res.status(422).json({message:err})};
  } );
router.post('/login',async (req,res)=>{
  try{
    const {email,password}=req.body;
    const userLogin = await User.findOne({email:email});
    if(!userLogin)
    {
      res.status(422).json({error:"user error"});
    }
    else{
      const isMatch=await bcrypt.compare(password,userLogin.password);
      // console.log(userLogin.password);
      const token =await userLogin.generateAuthToken();
      res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+259820000),
        httpOnly:true,
     });
      // console.log(isMatch);
      if(!isMatch)
      {
      res.status(422).json({error:"Invalid Credentials"});
      }
      else
      {
        
      res.status(200).json({message:"user signin succesfull"});
      }
    }
  }catch(err){
    res.status(422).json({message:err});
  }
})
router.get('/logout',Authenticate,async (req,res)=>{
  // console.log(req.cookies);
  try{
    res.clearCookie("jwtoken");
    await req.user.save();
  }catch(error)
  {
    res.status(500).send(error);
  }
});
router.post('/updatecart',async (req,res)=>{
  try{
    const {image, price,title, weight,id}=req.body;
    let items={image, price,title, weight};
    // console.log(id);
    var idd=id;
   
    User.findOneAndUpdate(
      { _id: ObjectId(idd)}, 
      { $push: { cart: {
        image,
        price,
        title,
        weight
      }  } },
     function (error, success) {
           if (!error) {
               console.log("Succesfull")
           } else {
             console.log(error);
           }
       }).catch(function(err){ console.log(err)});
  }catch(err)
  {
    console.log(err);
  }
});

router.get('/details',Authenticate,async (req,res)=>{
  if(req.loggedin)
  res.status(200).send(req.rootUser);
  else
  res.status(202).send();
 });
 
 router.post('/deletecart',async (req,res)=>{
  try{
    const {id1,id2}=req.body;
    // console.log(id);
    var idd1=id1;
    var idd2=id2;
   // console.log(idd1);
    //console.log(idd2);
    User.updateOne({ _id: ObjectId(idd1) }, { "$pull": { "cart": { "_id": ObjectId(idd2)} }}, function(err, succesfull){
      if(err){
          console.log(err);
          res.status(401).send();
      }
      {
        console.log("Succesful");
      res.status(200).send();
      }
  });
  }catch(err)
  {
    console.log(err);
  }
})
module.exports=router;