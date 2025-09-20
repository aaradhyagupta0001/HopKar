import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderMap from '../components/OrderMap';

function VendorFeed() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrders(res.data);
    } catch (err) { console.error(err); }
  };

  const acceptOrder = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/orders/status/${id}`, { vendorAccepted: true });
      fetchOrders();
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div style={{maxWidth:'600px', margin:'20px auto'}}>
      <h2>Vendor Feed 🏪</h2>
      {orders.length === 0 && <p>No orders yet 😬</p>}
      {orders.map(order => (
        <div key={order._id} style={{border:'1px solid #ccc', padding:'10px', margin:'10px 0', borderRadius:'5px'}}>
          <p><b>Name:</b> {order.userName}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Service:</b> {order.serviceType}</p>
          <p><b>Status:</b> {order.status}</p>
          <OrderMap address={order.address} />
          {!order.vendorAccepted && <button onClick={()=>acceptOrder(order._id)} style={{marginTop:'10px'}}>Accept Order ✅</button>}
        </div>
      ))}
    </div>
  );
}

export default VendorFeed;
