import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import "../Datatable/Datatable.css";
const Datatable = ()=>{
    const [data,setdata]=useState([]);
    const getData=()=>{
        fetch('https://shopmore1.herokuapp.com/contactusalldata'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            return response.json();
          })
          .then(function(myJson) {
            setdata(myJson)
          });
      }
     // console.log(data);
    useEffect(()=>{
        getData();
      },[])
    return(
<>
<h1>Data table</h1>

<table id="customers">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone number</th>
    <th>message</th>
  </tr>
   {
    data.map((items,idx)=>{
        return(
            <tr  key={idx}>
            <th>{items.name}</th>
            <th>{items.email}</th>
            <th>{items.phno}</th>
            <th>{items.message}</th>
          </tr>
        )
    })
   }
    
</table>

</>
    );
}
export default Datatable;