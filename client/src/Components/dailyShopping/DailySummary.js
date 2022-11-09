import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import {NavLink} from 'react-router-dom';
const useStyles = makeStyles(({ palette, breakpoints }) => ({
  btn: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 40,
    border: '1px solid',
    borderColor: palette.grey[400],
    '& > *': {
      fontWeight: 'bold',
      textTransform: 'none',
    },
    marginRight: 72,
    [breakpoints.up('sm')]: {
      marginRight: 'unset',
    },
  },
  big: {
    fontSize: 16,
  },
  large: {
    fontSize: 24,
  },
  mainGrid: {
    [breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },
}));

const DailySummary = ({total,setsum}) => {
  const styles = useStyles();
  return (
    <Grid
      container
      justify={'space-between'}
      className={styles.mainGrid}
      spacing={2}
    >
      <Grid item xs={12} sm={5} md={4}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box align={'right'}>
              <b className={styles.big}>Subtotal:</b>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box px={2} align={'right'} className={styles.big}>
              <span>₹{total}</span>
            </Box>
          </Grid>
        
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box align={'right'}>
              <b className={styles.big}>Total:</b>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box px={2} align={'right'} className={styles.large}>
              <span>₹{total}</span>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} md={4} container alignItems={'flex-end'}>
        <NavLink to='/'> 
        <Button className={styles.btn} startIcon={<KeyboardArrowLeft />}>
          Continue Shopping
        </Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default DailySummary;
