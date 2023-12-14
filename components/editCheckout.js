import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import supabase from '../utils/supabase';
import {  useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import {InputLabel} from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'white',
  right: '0%',
  textAlign: 'left',
  left: '30%',
  marginTop: '1.5%',

  height: '5%',
  width: '10%',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#89CFF0',
  },
  '&:active': {
    backgroundColor: '#89CFF0',
  },
}));

export default function EditCheckout({Checkout}) {
    
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [serialNumber, setSerialNumber] = React.useState('');
  const [deviceCategory, setDeviceCategory] = React.useState('');
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceModel, setDeviceModel] = React.useState('');

  useEffect(() => {

    const fetchItemData = async () => {
      try {
        const { data, error } = await supabase
          .from('Checkout')
          .select('*')
          .eq('id', Checkout.id)
          .single();

        if (error) {
          console.error('Error fetching checkout data:', error);
        } else {
          setFullName(data.fullName);
          setEmail(data.email);
          setLocation(data.location);
          setSerialNumber(data.serialNumber);
          setDeviceCategory(data.deviceCategory);
          setDeviceName(data.deviceName);
          setDeviceModel(data.deviceModel);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    if (open) {
      fetchItemData();
    }
  }, [open, Checkout.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const { error: deleteError } = await supabase
        .from('Checkout')
        .delete({ 
          fullName: fullName,
          email:email,
          location:location,
          serialNumber: serialNumber,
          deviceCategory: deviceCategory,
          deviceName: deviceName,
          deviceModel: deviceModel,
        })
        .eq('id', Checkout.id);
      if (deleteError) {
        console.error('Error deleting item:', deleteError);
      } else {
        console.log('Item deleted successfully');
      }
    } catch (error) {
      console.log('Error deleting item:', error);
    }

    setOpen(false);
  };

  const handleUpdate = async () => {
    try{
      const { data, error } = await supabase
      .from('Checkout')
      .update({ 
        fullName: fullName,
        email:email,
        location:location,
        serialNumber: serialNumber,
        deviceCategory: deviceCategory,
        deviceName: deviceName,
        deviceModel: deviceModel,
      })
      .eq('id', Checkout.id)
      if (error) 
      {
        console.error('Error updating list:', error);
      } else 
      {
        console.log('List updated successfully');
      }
    } catch (error) 
    {
      console.log('Error updating list:', error);
    }
  
    setOpen(false);
  };

  return (
    <div>
      <Stack>
        <IconButton onClick={handleClickOpen} aria-label="edit" size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle><br></br>
        <DialogContent>
        <TextField
            autoFocus
            margin="normal"
            id="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="Arnold Road">Arnold Road</MenuItem>
              <MenuItem value="Borders">Borders</MenuItem>
              <MenuItem value="Chippenham">Chippenham</MenuItem>
              <MenuItem value="Field Office">Field Office</MenuItem>
              <MenuItem value="Free Town">Free Town</MenuItem>
              <MenuItem value="Group Office">Group Office</MenuItem>
              <MenuItem value="Hatchery">Hatchery</MenuItem>
              <MenuItem value="Hill Run">Hill Run</MenuItem>
              <MenuItem value="Lucea">Lucea</MenuItem>
              <MenuItem value="Nest">Nest</MenuItem>
              <MenuItem value="Newport Mills">Newport Mills</MenuItem>
              <MenuItem value="St. Ann's Bay">St. Ann's Bay</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="normal"
            id="serialNumber"
            label="Serial Number"
            type="text"
            fullWidth
            variant="outlined"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="deviceCategory-label">Device Category</InputLabel>
            <Select
              labelId="deviceCategory-label"
              id="deviceCategory"
              value={deviceCategory}
              label="Device Category"
              onChange={(e) => setDeviceCategory(e.target.value)}
            >
              <MenuItem value="AccessPoint">Access Point</MenuItem>
              <MenuItem value="BlackBox">Black Box</MenuItem>
              <MenuItem value="Desktop">Desktop</MenuItem>
              <MenuItem value="Firewall">Firewall</MenuItem>
              <MenuItem value="HandHeld">Hand Held</MenuItem>
              <MenuItem value="Keyboard">Keyboard</MenuItem>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Monitor">Monitor</MenuItem>
              <MenuItem value="Mouse">Mouse</MenuItem>
              <MenuItem value="Printer">Printer</MenuItem>
              <MenuItem value="Router">Router</MenuItem>
              <MenuItem value="Scanner">Scanner</MenuItem>
              <MenuItem value="Server">Server</MenuItem>
              <MenuItem value="Switch">Switch</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="UPS">UPS</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="normal"
            id="deviceName"
            label="Device Name"
            type="text"
            fullWidth
            variant="outlined"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            id="deviceModel"
            label="Device Model"
            type="text"
            fullWidth
            variant="outlined"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
