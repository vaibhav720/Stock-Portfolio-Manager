import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


function DynamicImage(props) {
    let fontcolor="inherit"
    
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
          backgroundImage: `url(${props.data.img})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={props.data.img} alt={props.data.title} />}
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
              <Typography component="h1" variant="h3" color={fontcolor} gutterBottom>
                {props.data.title}
              </Typography>
              <Typography variant="h5" color={fontcolor} paragraph>
                {props.data.description}
              </Typography>
              <Link variant="subtitle1" href="/signup">
                Register to do more
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
  )
}

export default DynamicImage
