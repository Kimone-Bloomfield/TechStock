import Navbar from'../components/Navbar';
import CheckoutTable from '../components/checkoutTable';



function Checkout()
{
    return(
        <div>
            <u><h1 style={{ textAlign:"center", marginTop:"4%"}}>Checkout List</h1></u>
            <img style={{ width: "15%", height: "20%", marginLeft:"20%", marginTop:"-9%" }} src="/logo.png" alt="logo" />
        <Navbar></Navbar> 
        <CheckoutTable></CheckoutTable>
        <div style={{position:"fixed",top:45, right:300}}>
    </div>
    </div>
    );
}

export default Checkout;