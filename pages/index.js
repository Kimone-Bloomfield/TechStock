import ImageSlider from '../components/ImageSlider';
import Button from '@mui/material/Button';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import Navbar from'../components/Navbar';
import Link from 'next/link';
import SummarizeIcon from '@mui/icons-material/Summarize';

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'black',
  width:'15%',
  height:'50%',
  right:"0%",
  marginBottom:"5%",
  marginTop:'5%',
 textAlign:'left',
 left:"20%",
 alignItems:'center',
 justifyContent:'center',
 backgroundColor:'red',
 marginLeft:'1%',
 marginRight:'2%',
  '&:hover': {
    backgroundColor: 'darkred',
  },
  '&:active': {
      backgroundColor: 'darkred',
    },
}));

export default function index() {
  
  
  return (
    <div className="Home">
    <Navbar></Navbar>
    <h2>Dashboard</h2> 
    <ImageSlider></ImageSlider>

     <div className="homeBtn">
      <Link href="/inventory">
        <ColorButton variant="contained" startIcon={<InventoryIcon />}>
            <b>Inventory</b>
        </ColorButton>
        </Link>

        <Link href="/checkoutList">
        <ColorButton variant="contained" startIcon={<FactCheckIcon />}>
            <b>Checkout</b>
        </ColorButton>
        </Link>

        <Link href="/report">
        <ColorButton variant="contained" startIcon={<SummarizeIcon />}>
            <b>Report</b>
        </ColorButton>
        </Link>

        <Link href="/setting">
        <ColorButton variant="contained" startIcon={<SettingsIcon />}>
            <b>Setting</b>
        </ColorButton>
        </Link>
    </div>
</div>
  )
}



