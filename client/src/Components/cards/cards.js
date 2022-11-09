import React from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@mui/material/IconButton';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { spacing } from '@mui/system';
import { useEffect } from 'react';
import {useHistory} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
    backgroundColor: '#3a4d7c',
  },
}));
const useStyles = makeStyles(({ breakpoints }) => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    marginLeft:'auto',
    marginRight:'auto',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor:'default'
    },
  },
  card: ({ color }) => ({
    [breakpoints.down('md')]: {
      width:170,
    },
    [breakpoints.up('md')]: {
      width:250,
    },
   
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: 'primary.main',
      padding: '1rem',
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '1.2rem',
    color: 'black',
    textTransform: 'uppercase',
  },
  price: {
    fontFamily: 'Keania One',
    fontSize: '1.5rem',
    color: 'black',
    fontWeight:'bold',
    marginTop:'1 rem',
    textTransform: 'uppercase',
  },
  weight: {
    fontFamily: 'Montserrat',
    color: 'black',
    opacity: 0.87,
    fontWeight: 500,
    fontSize: 14,
  },
  button:{
    color:"blue",
    display:"block", 
    marginLeft:"auto", 
    marginRight:"auto",
  }
}));

const CustomCard = ({ classes, image, price,title, weight,logged,id,setcartsize,cartsize }) => {
  const navigate = useNavigate();
  const mediaStyles = useFourThreeCardMediaStyles();
   const Addtocart=async()=>{
       if(logged===false)
       {
       navigate('/signin'); 
       return;
       }
       fetch('https://shopmore1.herokuapp.com/updatecart',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
           image, price,title, weight,id
        })
      })
      setcartsize(p=>p+1)
      // console.log("cartsize",cartsize)
   }
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.price} variant={'h2'}>
          ₹{price}
          </Typography>
          <Typography className={classes.weight}>{weight}g</Typography>
      <IconButton className={classes.button}  onClick={Addtocart}>
  <AddShoppingCartIcon fontSize="large" />
</IconButton>
</CardContent>
      </Card>
    </CardActionArea>
  );
};

  
export const Cards = ({cartsize,setcartsize})=> {
  
  const [data,setdata]=useState([]);
  const [loggedin,setloggin]=useState(false);
  const[userid,setuserid]=useState("");
  const getData=()=>{
    fetch('https://shopmore1.herokuapp.com/cartts'
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
         setloggin(true);
         setuserid(data._id);
    }catch(err){
       console.log(err);
    }
  }
  const gridStyles = useGridStyles();
  useEffect(()=>{
    getData();
    checklog();
  },[])
  // console.log(data);
  // console.log(loggedin);
  const [ showMore, setShowMore ] = useState(10)
  const styles = useStyles({ color: 'white' });
  const [display,setdisplay]=useState(true);
  const showitem=()=>{
    var temp=showMore;
    if(temp+10>=data.length)
    {
    setShowMore(data.length);
    setdisplay(false);
    }
    else
    setShowMore(p=>p+10);
  }
  return (
    <>
      <Grid classes={gridStyles} container spacing={3} wrap={'wrap'} justifyContent={'center'} p={4}>
        {
          data
          .slice(0, showMore ) 
          .map((items)=>(
            <Grid item>
          <CustomCard
            classes={styles}
            title={items.title }
            weight={items.weight}
            price={items.price}
            image={
              items.image
            }
            logged={loggedin}
            id={userid} setcartsize={setcartsize}
            cartsize={cartsize}
          />
        </Grid>
          ))
        }
      </Grid>
      <Box backgroundColor={'#3a4d7c'} mt={1} p={4}>
      <Grid container justify="center"    >
      {display && <Button onClick={showitem} startIcon={<ArrowDropDownIcon fontSize="large" />} style={{ color: 'white' }} variant='outlined' size="large" > Show More </Button>}
    </Grid>
    </Box>
    </>
  );
};
export default Cards 