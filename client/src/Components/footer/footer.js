import React from 'react';
import  './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
export default function Footer(props)
{
  const navigate = useNavigate();
    return (
        <div>
        <footer>
  <div className="container">
    <div className="row">
      <div className="col about">
        <h3>About the store</h3>
        <ul>
          <li><a href="/#">Home</a></li>
          <li><a href="/#">About us</a></li>
          <li><a href="/#">FAQ</a></li>
          <li><a href="/#">Return policy</a></li>
          <li><a onClick={()=>navigate('/contact_us')} >Contact us</a></li>
          <li><a onClick={()=>navigate('/contactusdata')} >Contact us data</a></li>
        </ul>
      </div>
      <div className="col language">
        <h3>Language</h3>
        <ul>
          <li><a href="/#">Deutsch</a></li>
          <li><a href="/#">English</a></li>
          <li><a href="/#">Español</a></li>
          <li><a href="/#">Français</a></li>
          <li><a href="/#">Indonesian</a></li>
          <li><a href="/#">Italian</a></li>
          <li><a href="/#">Nederlands</a></li>
          <li><a href="/#">Polnisch</a></li>
          <li><a href="/#">Português</a></li>
          <li><a href="/#">pyccкий</a></li>
          <li><a href="/#">Tiếng Việt</a></li>
          <li><a href="/#">Türkçe</a></li>
        </ul>
      </div>
      <div className="col socail ">
        <h3>Get in touch</h3>
        <ul>
          <li><a href=""><FacebookIcon/></a></li>
          <li><a target='_blank' href="https://twitter.com/jsar3004"><TwitterIcon/></a></li>
          <li><a target='_blank' href="https://www.linkedin.com/in/jaspreet-singh-9515961a7/"><LinkedInIcon/></a></li>
        </ul>
      </div>
    </div>
  
  </div>
</footer>
        </div>
    )
}