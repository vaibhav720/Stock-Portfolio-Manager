import * as React from 'react';
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, addDoc, collection, arrayUnion, Timestamp } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { auth, db } from '../Firebase';
function Copyright(props) {


    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Vaibhav Parikh
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function AddStock() {
    const nameRef = useRef();
    const quantityRef = useRef();
    const valueRef = useRef();
    const { currentUser, signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const location = useLocation();

    async function handleSubmit(e) {

        e.preventDefault()
        
        const data = new FormData(e.currentTarget);
        console.log(currentUser.email)
        
            const washingtonRef = doc(db, "Stocks", currentUser.email);
            const values = {
                dates: Timestamp.fromDate(new Date()),
                value: data.get('value'),
                quantity: data.get('quantity'),
                name: location.state.name,
                symbol: location.state.Symbol
            }
            //console.log(values);
            await updateDoc(washingtonRef, {
                Add: arrayUnion(values)
             });
               history("/watchlist")

    }


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
                        backgroundImage: 'url(https://source.unsplash.com/random)',
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
                            Add Stock
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                                value={location.state.name}
                                autoComplete="name"
                                ref={nameRef}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="quantity"
                                label="Quantity"
                                type="number"
                                id="quantity"
                                ref={quantityRef}
                                autoComplete="quantity"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="value"
                                label="Value"
                                type="number"
                                id="value"
                                ref={valueRef}
                                autoComplete="value"
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Stock
                            </Button>
                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Link href="/watchlist" variant="body2">
                                        {"Remove"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}