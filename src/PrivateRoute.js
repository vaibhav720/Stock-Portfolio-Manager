import React from 'react'
import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from './contexts/AuthContext';


export default function PrivateRoute() {
    const {currentUser} = useAuth();
  return currentUser ? <Outlet />:<Navigate replace to="/signup" />
  
}
