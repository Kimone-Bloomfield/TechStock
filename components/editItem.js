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

export default function EditItem({ InventorySpecs }) {
  const [open, setOpen] = React.useState(false);
  const [serialNumber, setSerialNumber] = React.useState('');
  const [deviceCategory, setDeviceCategory] = React.useState('');
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceModel, setDeviceModel] = React.useState('');

  useEffect(() => {

    const fetchItemData = async () => {
      try {
        const { data, error } = await supabase
          .from('InventorySpecs')
          .select('*')
          .eq('id', InventorySpecs.id)
          .single();

        if (error) {
          console.error('Error fetching item:', error);
        } else {
          setSerialNumber(data.serialNumber);
          setDeviceCategory(data.deviceCategory);
          setDeviceName(data.deviceName);
          setDeviceModel(data.deviceModel);
        }
      } catch (error) {
        console.log('Error fetching item:', error);
      }
    };

    if (open) {
      fetchItemData();
    }
  }, [open, InventorySpecs.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const { error: deleteError } = await supabase
        .from('InventorySpecs')
        .delete()
        .eq('id', InventorySpecs.id);
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
    try {
      const { data, error } = await supabase
        .from('InventorySpecs')
        .update({
          serialNumber: serialNumber,
          deviceCategory: deviceCategory,
          deviceName: deviceName,
          deviceModel: deviceModel,
        })
        .eq('id', InventorySpecs.id);
  
      if (error) 
      {
        console.error('Error updating item:', error);
      } else 
      {
        console.log('Item updated successfully');
        setSerialNumber(data.serialNumber);
        setDeviceCategory(data.deviceCategory);
        setDeviceName(data.deviceName);
        setDeviceModel(data.deviceModel);
      }
    } catch (error) 
    {
      console.log('Error updating item:', error);
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
