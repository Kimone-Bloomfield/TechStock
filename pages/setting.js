import Navbar from'../components/Navbar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup'; 
import React from "react";

const buttons = [
            <Button style={{marginBottom:"10%", color:'black'}} key="one" startIcon={<AccountCircleOutlinedIcon/>}>Edit Profile</Button>, 
            <Button style={{marginBottom:"10%", color:'black'}} key="three" startIcon={<ExitToAppOutlinedIcon/>}>Sign Out</Button>,  
          ];
const Setting=()=>
{
     return(
     
      <div className='Setting'>  
       <h2>Setting</h2>
    <Navbar></Navbar>
        <Box
      sx={{
        display: 'flex',
        marginBottom:'10%',
        color:'black',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup style={{color:"black",
        right:"0%",
        marginBottom:"5%",
        marginTop:"5%",
        marginLeft:'16%',
        marginRight:'2%',
    }}
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
</div>
    );
}

export default Setting;