import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderMap from '../components/OrderMap';

function PartnerFeed() {
  const [orders, setOrders] = useState([]);
  const [partnerName, setPartnerName] = useState('Partner1');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrders(res.data.filter(o => o.partnerAssigned && o.partnerName === partnerName && o.status !== 'done'));
    } catch (err) { console.error(err); }
  };

  const markDelivered = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/orders/status/${id}`, { status: 'done' });
      fetchOrders();
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div style={{maxWidth:'600px', margin:'20px auto'}}>
      <h2>Partner Feed 🛵</h2>
      {orders.length === 0 && <p>No active deliveries 😬</p>}
      {orders.map(order => (
        <div key={order._id} style={{border:'1px solid #ccc', padding:'10px', margin:'10px 0', borderRadius:'5px'}}>
          <p><b>Name:</b> {order.userName}</p>
          <p><b>Address:</b> {order.address}</p>
          <p><b>Service:</b> {order.serviceType}</p>
          <p><b>Status:</b> {order.status}</p>
          <OrderMap address={order.address} />
          <button onClick={() => markDelivered(order._id)} style={{marginTop:'10px'}}>Mark Delivered ✅</button>
        </div>
      ))}
    </div>
  );
}

export default PartnerFeed;
