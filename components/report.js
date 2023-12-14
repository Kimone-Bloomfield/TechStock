import * as React from 'react';
import supabase from '../utils/supabase';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
color: 'black',
width:'15%',
height:'50%',
right:"0%",
marginBottom:"5%",
marginTop:'1%',
 textAlign:'left',
 left:"42%",
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

export default function ReportComp() {

  const [categories, setCategories] = React.useState([]);
  const [pdfContent, setPdfContent] = React.useState(null);
  const currentDate = new Date().toLocaleDateString();

  
  React.useEffect(() => {
    fetchData();
  }, []);

 
  const fetchData = async () => {
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
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.setProperties({
      title: 'Low Stock Report',
      filename: 'LowStockReport.pdf',
    });

  
    doc.text('Low Stock Report', 15, 10);
    doc.text(`Date: ${currentDate}`, 15, 20);
  
  
    const tableData = Object.entries(categories).map(([category, count]) =>
      count <= 5
        ? [category, '10', count <= 5 ? count.toString() : '0', count <= 5 ? (10 - count).toString() : '0']
        : []
    );
  
    const tableOptions = {
      head: [['Category', 'Min. Quantity', 'In Stock', 'Reorder Level']],
      body: tableData,
      startY: 40, 
      styles: {
        halign: 'center', 
      },
    };
  
    doc.autoTable(tableOptions);
  
    return doc.output('datauristring');
  };  

  const handleGeneratePDF = () => {
    const pdfOutput = generatePDF();
    setPdfContent(pdfOutput);
  //   cron.schedule('0 16 * * friday', () => {
  // console.log('running a task every Friday at 4:00 pm');
  // });
};

  return (
    <div style={{ overflowX: 'auto', marginLeft: '15%', marginTop:'-15%' }}>
      <h3 style={{ textAlign: 'center' }}>Low Stock Report</h3>
      <p style={{ textAlign: 'center' }}>Today's Date: {currentDate}</p>
      <ColorButton onClick={handleGeneratePDF}>Generate Report</ColorButton>
      {pdfContent && (
        <iframe
          src={pdfContent}
          title="Generated PDF"
          style={{ width: '100%', height: '800px', marginTop: '20px' }}
        />
      )}
    </div>
  );
}

