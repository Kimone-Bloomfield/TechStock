import Navbar from'../components/Navbar';
import ReportComp from '../components/report';

function Report()
{
    return(
        <div>
            <h2>Report</h2>
            <img style={{ width: "15%", height: "20%", marginLeft:"20%", marginTop:"3%" }} src="/logo.png" alt="logo" />
            <Navbar></Navbar>
            <ReportComp></ReportComp>
           
        </div>
    );
}

export default Report;