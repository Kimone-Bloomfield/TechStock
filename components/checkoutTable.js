import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import supabase from '../utils/supabase';
import { useState, useEffect } from 'react';
import EditCheckout from './editCheckout'; 
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
  marginBottom: '10px',
  paddingRight: '10px',
});

const SearchBar = styled('div')({
  position: 'absolute',
  borderRadius: '25px',
  backgroundColor: '#f1f1f1',
  marginRight: '10px',
  marginTop:'1%',
  bottom:'90%',
  backgroundColor: '#ffffff',
    boxShadow: '0 0 0 2px rgba(0, 120, 212, 0.3)',
  '&:hover': {
    backgroundColor: '#f8f8f8',
  }
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0 10px',
  pointerEvents: 'none',
});

const SearchInput = styled(InputBase)(({ theme }) => ({
  paddingLeft: '40px', 
  width: '300px',
  [theme.breakpoints.down('xs')]: {
    width: '150px', 
  },
}));


export default function CheckoutTable() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: Checkout, error } = await supabase.from('Checkout').select('*').order('fullName', 'ascending');
        if (error)
         {
          throw new Error(error.message);
        }

        setRows(Checkout);

        console.log(Checkout);
      } catch (error)
       {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData();

    supabase.channel('schema-db-changes')
  .on(
    'postgres_changes',
    { event: '*',
     schema: 'public', 
     table: 'Checkout' },
    (payload) => {
      console.log('Change received!', payload)
      fetchData();
    }
  )
  .subscribe()

  }, []); 

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div style={{ overflowX: "auto", marginLeft: "15%" }}>
      <SearchContainer>
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput
            placeholder="Search"
            inputProps={{ 'aria-label': 'search', 'aria-labelledby': 'searchable' }}
            onChange={handleSearch}
          />
        </SearchBar>
      </SearchContainer>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550, marginTop:-1 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{}}>
            <TableCell align="center">Full Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Serial Number</TableCell>
            <TableCell align="center">Device Category</TableCell>
            <TableCell align="center">Device Name</TableCell>
            <TableCell align="center">Device Model</TableCell>
            <TableCell align="center">Reassign</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        {rows.filter(row => row.deviceCategory.toLowerCase().includes(search.toLowerCase()) || row.fullName.toLowerCase().includes(search.toLowerCase()) || row.serialNumber.toLowerCase().includes(search.toLowerCase())).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.serialNumber}</TableCell>
              <TableCell align="center">{row.deviceCategory}</TableCell>
              <TableCell align="center">{row.deviceName}</TableCell>
              <TableCell align="center">{row.deviceModel}</TableCell>
              <TableCell align="center"> 
                <EditCheckout Checkout={row}/>
              </TableCell>  
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}