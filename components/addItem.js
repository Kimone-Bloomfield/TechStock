import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import supabase  from '../utils/supabase';
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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [serialNumber, setSerialNumber] = React.useState('');
  const [deviceCategory, setDeviceCategory] = React.useState('');
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceModel, setDeviceModel] = React.useState('');

/**
 * The above code defines a function that inserts data into a table called 'InventorySpecs' using
 * Supabase and then closes a modal.
 */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const { data: InventorySpecs, error } = await supabase
        .from('InventorySpecs')
        .insert([
          {
            serialNumber: serialNumber,
            deviceCategory: deviceCategory,
            deviceName: deviceName,
            deviceModel: deviceModel,
          },
        ])
        .select();
  
      if (error) 
      {
        console.error('Error inserting data:', error);
      } else 
      {
        console.log('Data inserted successfully:', InventorySpecs);
        console.log(InventorySpecs);
      }
    } catch (error) 
    {
      console.error('Error inserting data:', error);
    }
  
    setOpen(false);
  };
/* The code you provided is a React component called `FormDialog`. It renders a dialog box with form
fields for adding an item. */
  return (
    <div>
      <ColorButton variant="contained" onClick={handleClickOpen}>
        Add Item
      </ColorButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <br />
        <DialogContent>
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
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}