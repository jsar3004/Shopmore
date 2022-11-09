import './App.css';
import { useState } from 'react';
import Home from './Pages/Home/Home';
import PrimarySearchAppBar from './Components/top_nav_bar/top_nav_bar';
import Footer from './Components/footer/footer';
import ShoppingCart from './Pages/cart/cart';
import { Routes, Route } from "react-router-dom";
import SignIn from './Components/signin/signin';
import SignUp from './Components/signup/signup';
import Contact_us from './Components/Contact_us/Contact_us';
import ContactUsdata from './Components/Contact_us_data/Contact_us_data';
import Datatable from './Components/Datatable/DataTable';
function App() {
  const [cartsize,setcartsize]=useState(0);
  return (
    <>
  <PrimarySearchAppBar cartsize={cartsize} setcartsize={setcartsize}/>  
  <Routes>
  
          <Route path="/" element={<Home  cartsize={cartsize} setcartsize={setcartsize}/>}/>
          <Route path="/Cart" element={<ShoppingCart cartsize={cartsize} setcartsize={setcartsize} />}/>
          <Route path="/Signin" element={<SignIn/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Contactusdata" element={<ContactUsdata/>}/>
          <Route path="/Contact_us" element={<Contact_us/>}/>
          <Route path="/datatable" element={<Datatable/>}/>
    </Routes>
    <Footer/>  
  </>
  );
}

export default App;
