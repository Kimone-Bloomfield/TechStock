import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography'; 
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useRouter } from 'next/router';
import Link from 'next/link'; 

const drawerWidth = 200;
const data = [
  { name: "Dashboard", icon: <DashboardIcon />, href: "/" },
  { name: "Inventory", icon: <InventoryIcon />, href: "/inventory" },
  { name: "Checkout", icon: <FactCheckIcon />, href: "/checkoutList" },
  { name: "Report", icon: <SummarizeIcon/>, href: "/report" },
  { name: "Setting", icon: <SettingsIcon />, href: "/setting" },
];

export default function Navbar() {
  const router = useRouter();

  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginTop: '0',
          textDecoration:'none',

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'red',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className='logo'>
          <img style={{ width: "35%", height: "80%", float: "left", marginTop: '5%' }} src="/logo.png" alt='logo' />
          <h1 style={{ fontSize: "20px" }}>TechStock</h1>
        </div>
        <List>
          {data.map((item, index) => (
            <Link href={item.href} key={index} passHref style={{textDecoration:'none'}}>
              <ListItemButton
                onClick={() => handleClick(item.href)}
                sx={{
                  color: 'black',
                  '&:hover': { backgroundColor: 'white' },
                  '&:active': { backgroundColor: 'white' },
                  borderRadius: '10px',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
               <Typography variant='inherit'>{item.name}</Typography>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
