import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {NavLink} from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import './top_nav_bar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function PrimarySearchAppBar({cartsize,setcartsize}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
    handleMobileMenuClose();
  };
  const signin=()=>{
    handleMenuClose();
    navigate('/signin'); 
  }
  const signup=()=>{
    handleMenuClose();
    navigate('/signup'); 
  }
  const opencart=()=>{
   if(logged===false)
   navigate('/signin'); 
   else
   navigate('/cart'); 
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
   const [data,setdata]=useState();
   const [logged,setlogstatus]=useState(false);
   const checklog=async()=>{
    try{
         const res=await fetch('https://shopmore1.herokuapp.com/details',{
           method:"GET",
           headers:{
             Accept:"application/json",
             "Content-type":"application/json"
           },
     
         });
         const data=await res.json();
         if(!res.status===200)
         {
           const error=new Error(res.error);
           throw error;
          
         }
        setcartsize(data.cart.length);
        setlogstatus(true);
        // console.log(logged);
         //console.log(data.cart.length);
    }catch(err){
       console.log(err);
    }
  }  
  const Logout=()=>{
    console.log("pass");
    fetch('https://shopmore1.herokuapp.com/logout', {
      method: 'get',
  
  
    }).then((res)=>{
      window.alert("Logout succesful");
      navigate('/signin',{replace:true});
      setcartsize(0);
      handleMenuClose();
      setlogstatus(false);
      if(!res.status===200)
      {
         const error=new Error(res.error);
         throw error;
      } 
    }).catch((err)=>{
      console.log(err);
    });
  };
  
  useEffect(()=>{
    checklog()
  },)
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
       !logged&&
         <div>
        <MenuItem onClick={signin}>Signin</MenuItem>
        <MenuItem onClick={signup}>signup</MenuItem>
       </div>
      }
      {
        logged&&
        <>
         <MenuItem onClick={Logout}>logout</MenuItem>
        </>
      }
       
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      color={"#000000"}
    >
      
      <MenuItem >
      
        <IconButton size="large" aria-label="show 4 new mails" color='inherit' onClick={opencart}>
          <Badge badgeContent={cartsize} color="error">
        
            <ShoppingCartIcon sx={{color:'black'}} />
          
          </Badge>
        </IconButton>
        <p>Cart</p>
        
      </MenuItem>
     
      <MenuItem >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
           
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon  />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const logo=()=>{
    navigate('/'); 
  }
  return (
  <>
    
    <Box sx={{ flexGrow: 1}}>   
      <AppBar position="sticky" style={{ background: '#1E3161',position: 'fixed' }} >
        <Toolbar>
          <Link
            variant="h6"
            component="div"
            sx={{ display:'block'}}
            style={{color:"white",cursor:'pointer'}}

            onClick={logo}
          >
            ShopMore
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }  }}  >
    
            <IconButton size="large" aria-label="show 4 new mails" onClick={opencart} color="inherit" style={{padding:'10px'}} >
              <Badge badgeContent={cartsize} color="error" style={{color:"white"}} >
         <ShoppingCartIcon/>  
              </Badge>
            </IconButton>
           
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              style={{color:"white",padding:'10px'}}
              
            >
              <Badge badgeContent={0} color="error" >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{color:"white",padding:'10px',margin:'0px'}}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              style={{padding:'10px'}}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      </Box>
    </>
  );
}
