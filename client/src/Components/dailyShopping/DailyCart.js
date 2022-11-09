import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import DailyInteger from './DailyInteger';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  heading: {
    fontWeight: 900,
    fontSize: '1.75rem',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [breakpoints.up('md')]: {
      fontSize: '2.25rem',
    },
  },
  table: {
    minWidth: 650,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  name: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
    margin: '0 0 8px 0',
  },
  descr: {
    fontSize: 14,
    color: palette.text.secondary,
  },
}));




const DailyCart = ({cartsize,setcartsize,total,setsum}) => {
  const [rows,setrows]=useState([]);
  const [id1,setid1]=useState();
  const [id2,setid2]=useState();
  const checklog=async()=>{
    try{
         const res=await fetch('https://shopmore1.herokuapp.com/details',{
           method:"GET",
           headers:{
             Accept:"application/json",
             "Content-type":"application/json"
           },
           credentials:"include"
         });
         const data=await res.json();
         if(!res.status===200)
         {
           const error=new Error(res.error);
           throw error;
         }
        //  console.log(data.cart);
         setrows(data.cart);
         setid1(data._id);
         var temp=0;
         for(var i=0;i<data.cart.length;i++)
         {
            temp+=(data.cart[i].price);
         }
         setsum(temp);
    }catch(err){
       console.log(err);
    }
  }
  useEffect(()=>{
    checklog();
  },[])
  const deleteitems=async(id2)=>{ 
    fetch('https://shopmore1.herokuapp.com/deletecart',{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
        id1,id2
     })
   })
    setcartsize(p=>p-1);
  //  console.log("cartsize",cartsize)
  checklog();
}
  const styles = useStyles();
  return (
    <Box pt={{ xs: 2, sm: 4, md: 6 }}>
      <Typography className={styles.heading} variant={'h1'} gutterBottom>
        Shopping Cart.
      </Typography>
      <TableContainer>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  <Box display={'flex'} alignItems={'center'}>
                    <Box width={80} height={80}>
                      <img
                        className={styles.image}
                        alt={row.title}
                        src={row.image}
                      />
                    </Box>
                    <Box ml={2}>
                      <p className={styles.name}>{row.title}</p>
                      <span className={styles.descr}>{row.weight}</span>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>deleteitems(row._id)}>
                    <Close />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyCart;
