import React from 'react'
import { Navigate, Outlet} from "react-router-dom";
import BasicPage from './components/BasicPage';
import { useAuth } from './contexts/AuthContext';


export default function PrivateRoute() {
    const {currentUser} = useAuth();
  return currentUser ? <BasicPage />:<Navigate replace to="/signup" />
  
}
