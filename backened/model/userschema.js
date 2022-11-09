const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require("dotenv").config();
const userSchema=new mongoose.Schema({
   email:{
       type:String,
       required:true,
       validate(value){
           if(!validator.isEmail(value)){
                throw new Error("email is invalid");
           }
       }
   },
   password:{
       type:String,
       required:true,
   },
   tokens: [
    {
    token:{
      type:String,
      required:true,
    }
    }
     ],
     cart: [
        {
        
            title:{
                type:String,
               
            },
           weight:{
                type:Number,
                
            },
            price:{
                type:Number,
               
            },
            image:{
                type:String,
                
            },
    }
         ]
},
{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
},
)
userSchema.pre('save',async function(next)
{
  if(this.isModified('password')){
      this.password=await bcrypt.hash(this.password,12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function()
{
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}
const cartSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
   weight:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
 }
 );
 const contactusSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phno:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
},
{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
},
 )
const User=mongoose.model('USER',userSchema);
const Cart=mongoose.model('CART',cartSchema);
const Contactus=mongoose.model('CONTACTUS',contactusSchema);
module.exports={
    User:User,
    Cart:Cart,
    Contactus:Contactus,
} 