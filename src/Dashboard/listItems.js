import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';




export default function MainListItems ()
{
  const history = useNavigate();

  function Home(){
    history('/');
  }

  function WatchList(){
    history('/watchlist');
  }

  function Dashboard(){
    history('/dashboard');
  }


function Advchart(){
  history('/lightWeight');
}
  return  <React.Fragment>
  <ListItemButton onClick={Home}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </ListItemButton>
  <ListItemButton  onClick={WatchList}>
    <ListItemIcon>
      <AccountBalanceIcon />
    </ListItemIcon>
    <ListItemText primary="Watch List" />
  </ListItemButton>
  <ListItemButton onClick={Dashboard}>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItemButton>
  <ListItemButton onClick={Advchart}> 
    <ListItemIcon>
      <BarChartIcon />
    </ListItemIcon>
    <ListItemText primary="Charts" />
  </ListItemButton>
  <ListItemButton>
    <ListItemIcon>
      <LayersIcon />
    </ListItemIcon>
    <ListItemText primary="Integrations" />
  </ListItemButton>
</React.Fragment>
}
  