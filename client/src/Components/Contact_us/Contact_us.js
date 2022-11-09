import React, { useState } from "react";
import "../Contact_us/Contact_us.css";
function Contact_us(){
  const[details,setdetails]=useState({
    name:"",
    email:"",
    phno:"",
    message:"",
  });
  const handlechange=(event)=>{
    const{
      name,value
    }=event.target;
    setdetails({...details,[name]:value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const{name,email,phno,message}=details;
    const res=await fetch("https://shopmore1.herokuapp.com/contactusdata",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
          name,email,phno,message
        })
    });
    console.log(res.status);
    if(res.status===200)
    {
      window.alert("Succesfull");
    }
    else
    window.alert(res.message);
  }
    return(
        <div class="containe">  
  <form id="contact" action="" method="post">
    <h3>Quick Contact</h3>
    <h4>Contact us today, and get reply with in 24 hours!</h4>
    <fieldset>
      <input placeholder="Your name" type="text" name='name'  required autofocus value={details.name} onChange={handlechange}>
        </input>
    </fieldset>
    <fieldset>
      <input placeholder="Your Email Address" type="email" name='email' required value={details.email} onChange={handlechange}></input>
    </fieldset>
    <fieldset>
      <input placeholder="Your Phone Number" type="tel" name='phno' required value={details.phno} onChange={handlechange}></input>
    </fieldset>
    <fieldset>
      <textarea placeholder="Type your Message Here...." name='message' required value={details.message} onChange={handlechange}></textarea>
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" onClick={handleSubmit}>Submit</button>
    </fieldset>
  </form>
</div>
    );
}
export default Contact_us;