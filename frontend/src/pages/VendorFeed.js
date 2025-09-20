import { useEffect, useState } from 'react';
import axios from 'axios';

function VendorFeed() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptOrder = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/orders/accept/${id}`);
      console.log(res.data);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const assignPartner = async (id) => {
    const partnerName = prompt('Enter partner name:');
    if(!partnerName) return;
    try {
      const res = await axios.post(`http://localhost:5000/orders/assign/${id}`, { partnerName });
      console.log(res.data);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const markDone = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/orders/status/${id}`, { status: 'done' });
      console.log(res.data);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div style={{maxWidth:'600px', margin:'20px auto'}}>
      <h2>Vendor Feed 🧾</h2>
      {orders.length === 0 && <p>No orders yet 😬</p>}
      {orders.map(order => (
        <div key={order._id} style={{border:'1px solid #ccc', padding:'10px', margin:'10px 0', borderRadius:'5px'}}>
          <p><b>Name:</b> {order.userName}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Service:</b> {order.serviceType}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Vendor Accepted:</b> {order.vendorAccepted ? '✅' : '❌'}</p>
          <p><b>Partner Assigned:</b> {order.partnerAssigned ? order.partnerName : '❌'}</p>
          {!order.vendorAccepted && <button onClick={()=>acceptOrder(order._id)}>Accept Order</button>}
          {order.vendorAccepted && !order.partnerAssigned && <button onClick={()=>assignPartner(order._id)}>Assign Partner</button>}
          {order.vendorAccepted && order.partnerAssigned && order.status !== 'done' && <button onClick={()=>markDone(order._id)}>Mark Done</button>}
        </div>
      ))}
    </div>
  );
}

export default VendorFeed;
import OrderMap from '../components/OrderMap';

// inside orders.map()
{order.vendorAccepted && !order.partnerAssigned &&
  <>
    <OrderMap address={order.address} />
    <button onClick={()=>assignPartner(order._id)}>Assign Partner</button>
  </>
}
