import { useState } from 'react';
import axios from 'axios';

function PostJob() {
  const [form, setForm] = useState({ userName: '', address: '', serviceType: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/orders', form);
      alert('Order posted! ✅');
      console.log(res.data);
      setForm({ userName: '', address: '', serviceType: '' });
    } catch (err) {
      console.error(err);
      alert('Error posting order 😬');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'10px', maxWidth:'400px', margin:'20px auto'}}>
      <input name="userName" placeholder="Your Name" value={form.userName} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <select name="serviceType" value={form.serviceType} onChange={handleChange}>
        <option value="">Select Service</option>
        <option value="press">Press</option>
        <option value="tiffin">Tiffin</option>
        <option value="tailor">Tailor</option>
      </select>
      <button type="submit" style={{padding:'10px', backgroundColor:'#ff6f61', color:'#fff', border:'none', borderRadius:'5px'}}>Book it 🔥</button>
    </form>
  );
}

export default PostJob;
