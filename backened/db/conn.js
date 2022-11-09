const mongoose=require('mongoose');
const DB=process.env.DBA;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connection is succesful database');
}).catch((err)=>{
    console.log(err);
})