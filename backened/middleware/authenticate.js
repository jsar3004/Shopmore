const jsw=require('jsonwebtoken');
var jwt = require("jsonwebtoken");
const {User} = require('../model/userschema');
const Authenticate=async(req,res,next)=>{
    try{
      const token=req.cookies.jwtoken;
      const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
      const rootUser=await User.findOne({_id:verifyToken._id,"tokens:token":token});
      if(!rootUser){throw new Error("User not found")}
      req.token=token;
      req.rootUser=rootUser;
      req.userID=rootUser._id;
      req.loggedin=true;
      next();
    }catch(err){
        res.status(402).send(err);
        // console.log(err);
    }
}
module.exports=Authenticate;