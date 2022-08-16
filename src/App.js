import * as React from 'react';
import Signup from './Registration/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Login from './Registration/Signin';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import MarketNews from './Dashboard/MarketNews';
import LightWeightChartSelf from"./charts/LightWeightChart";
import WatchList from './Dashboard/WatchList';
import AddStock from './Registration/AddStock';
import NewDashboard from './Dashboard/NewDashboard';
import Main from './components/Main';
  
function App() {
  

  return (

    <>
         <BrowserRouter>
         <AuthProvider> 
           <Routes>
           <Route path='*' element={<Main/>} />
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
             
             <Route exact path='/lightWeight' element={<PrivateRoute/>}>
                <Route exact path='/lightWeight' element={<LightWeightChartSelf/>} />
             </Route>
             <Route exact path='/watchlist' element={<PrivateRoute/>}>
                <Route exact path='/watchlist' element={<WatchList/>} />
             </Route>
             <Route exact path='/addStock' element={<PrivateRoute/>}>
                <Route exact path='/addStock' element={<AddStock/>} />
             </Route>

             <Route exact path='/dashboard' element={<PrivateRoute/>}>
                <Route exact path='/dashboard' element={<NewDashboard/>} />
             </Route>
           </Routes>
         </AuthProvider>

         </BrowserRouter>
         </>

       
    
    
    
  );
}

export default App;
