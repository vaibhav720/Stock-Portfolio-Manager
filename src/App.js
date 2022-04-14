import Signup from './Registration/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Dashboard from './Dashboard/Dashboards';
import Login from './Registration/SignIn';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import MarketNews from './Dashboard/MarketNews';


function App() {
  return (

    
     
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
       
    
    
    
  );
}

export default App;
