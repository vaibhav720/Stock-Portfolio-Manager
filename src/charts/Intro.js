import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import axios from 'axios';


function FeaturedPost(props) {
  
  const [intro,setIntro]= React.useState({})
    axios.get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=A3QPG0GAAYX8VGI2").then(res => {
      const pData=res.data;
      console.log(pData);
      setIntro(pData);
    })

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }}  />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {intro["Name"]}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {intro["Description"]}
            </Typography>
            <Link variant="subtitle1" href="#">
              {intro["52WeekHigh"]}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}



export default FeaturedPost;