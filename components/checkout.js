import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';;
import supabase  from '../utils/supabase';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import {InputLabel} from '@mui/material';

export default function Checkout({ InventorySpecs }) {
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

/**
 * The handleSave function saves data from a form into a database table and deletes an item from
 * another table.
 */
  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from('Checkout').insert([
        {
          fullName: fullName,
          email: email,
          location: location,
          //copy the data
          serialNumber: InventorySpecs.serialNumber,
          deviceCategory: InventorySpecs.deviceCategory,
          deviceName: InventorySpecs.deviceName,
          deviceModel: InventorySpecs.deviceModel,
        },
      ]);
  
      if (error) 
      {
        console.error('Error inserting data:', error);
      } else 
      {
        console.log('Data inserted successfully:', data);
  
        const { error: deleteError } = await supabase
          .from('InventorySpecs')
          .delete()
          .eq('id', InventorySpecs.id);
        if (deleteError)
         {
          console.error('Error deleting item:', deleteError);
        } else 
        {
          console.log('Item deleted successfully');
        }
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  
    setOpen(false);
  };

  /* The `return` statement in the code is rendering a React component that displays a button labeled
  "Checkout". When the button is clicked, it opens a dialog box with a form for the user to enter
  their full name, email, and select a location from a dropdown menu. The form fields are controlled
  by state variables (`fullName`, `email`, `location`) and their values are updated as the user
  types or selects an option. The dialog box also has "Cancel" and "Save" buttons, which can be
  clicked to close the dialog or save the form data, respectively. */
  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" size="small" sx={{align:"center"}}>Checkout</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout</DialogTitle>
        <br />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
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
            margin="dense"
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
              <MenuItem value="ArnoldRoad">Arnold Road</MenuItem>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
