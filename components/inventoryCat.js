import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import supabase from '../utils/supabase';
import Grid from '@mui/material/Grid';
import ReportTable from './report';
import { useInterval } from 'react-use';

export default function ColorChips() {
  const [categories, setCategories] = React.useState([]);

  useInterval(() => {
  async function fetchData() {
    try {
      const { data, error } = await supabase.from('InventorySpecs').select('deviceCategory');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const categoryCounts = data.reduce((counts, item) => {
          counts[item.deviceCategory] = (counts[item.deviceCategory] || 0) + 1;
          return counts;
        }, {});
        setCategories(categoryCounts);
        {Object.keys(categories).length > 0 && <ReportTable data={categories} />}
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
},500); 

  const getCategoryColor = (count) => {
    return count <= 5 ? 'error' : 'success';
  };

  return (
    <Stack>
      <Grid alignItems="center" marginLeft="15%" marginTop="1%">
        {Object.entries(categories).map(([category, count]) => (
          <Chip
            sx={{ margin: '1%' }}
            key={category}
            label={`${category} (${count})`}
            color={getCategoryColor(count)}
          />
        ))}
      </Grid>
      
    </Stack>
  );
}
