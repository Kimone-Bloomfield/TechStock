import * as React from 'react';
import Navbar from'../components/Navbar';
import SearchBar from '../components/searchbar';
import AddItem from '../components/addItem';
import InventoryTable from '../components/inventoryTable';
import ColorChips from '../components/inventoryCat';
function Inventory()
{
 
    
    return(
        <div>
            <h2>Inventory List</h2>
          <div><AddItem></AddItem></div>
          <Navbar></Navbar> 
          <ColorChips></ColorChips>
          <br></br><InventoryTable></InventoryTable>

  </div>
    );
}

export default Inventory;