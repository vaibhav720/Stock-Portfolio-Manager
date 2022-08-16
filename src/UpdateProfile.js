import React, {useRef, useState} from 'react'
import {useAuth} from "./contexts/AuthContext";
import {  useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../src/components/Copyright';

const theme = createTheme();


export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error,setError] =useState('');
    const [loading,setLoading] =useState(false);
    const history = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !==passwordConfirmRef.current.value)
        {
            return setError("Passwords do not match");
        }
        setLoading(true);
        setError('');
        const promises =[];
        if(emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value !== currentUser.password)
        {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(()=>{
            history("/");
        }).catch(()=>{
            setError('Failed to update account');
        }).finally(()=>{
            setLoading(false);
        })


        
    }


console.log(error);


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                ref={emailRef}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                ref={passwordRef}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password-confirm"
                label="Confirm Password"
                type="password"
                id="password-confirm"
                ref={passwordConfirmRef}
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Have account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
