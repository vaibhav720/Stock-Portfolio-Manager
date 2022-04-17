import * as React from 'react';
import Signup from './Registration/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Dashboard from './Dashboard/Dashboards';
import Login from './Registration/SignIn';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import MarketNews from './Dashboard/MarketNews';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (

    
    <ThemeProvider theme={theme}>
    <CssBaseline />
         <BrowserRouter>
         <AuthProvider> 
           <Routes>
             <Route path='/signup' element={<Signup/>} />
             <Route path='/login' element={<Login/>} />
             <Route path='/update-profile' element={<PrivateRoute/>}>
                <Route path='/update-profile' element={<UpdateProfile/>} />
             </Route>
{/*              
             <Route path='/forgot-password' element={<ForgotPassword/>} /> */}
             <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<MarketNews/>} />
             </Route>
           </Routes>
         </AuthProvider>

         </BrowserRouter>
         </ThemeProvider>

       
    
    
    
  );
}

export default App;
